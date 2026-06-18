import type { Plugin } from 'vite';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';
import MagicString from 'magic-string';

const traverse = ((_traverse as any).default ?? _traverse) as typeof _traverse;

/**
 * React 源码追踪插件
 * 为 React 组件添加 _debugSource 属性,便于在浏览器中查看组件源文件位置
 */
export function reactSourceTrackerPlugin(): Plugin {
  return {
    name: 'react-source-tracker',
    enforce: 'pre',
    transform(code, id) {
      // 只处理 TypeScript/JavaScript 文件,跳过 node_modules
      if (!/\.(tsx?|jsx?)$/.test(id) || id.includes('node_modules')) {
        return null;
      }

      try {
        const ast = parse(code, {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        });

        const s = new MagicString(code);
        let hasReactComponent = false;

        // 遍历 AST 查找 React 组件
        traverse(ast, {
          FunctionDeclaration(path) {
            if (isReactComponent(path.node)) {
              hasReactComponent = true;
              addDebugSource(s, path.node, id);
            }
          },
          VariableDeclarator(path) {
            if (
              t.isArrowFunctionExpression(path.node.init) ||
              t.isFunctionExpression(path.node.init)
            ) {
              if (t.isIdentifier(path.node.id) && isReactComponentName(path.node.id.name)) {
                hasReactComponent = true;
                addDebugSourceForVariable(s, path.node, id);
              }
            }
          },
          ClassDeclaration(path) {
            if (path.node.superClass && t.isMemberExpression(path.node.superClass)) {
              if (
                t.isIdentifier(path.node.superClass.object) &&
                path.node.superClass.object.name === 'React' &&
                t.isIdentifier(path.node.superClass.property) &&
                path.node.superClass.property.name === 'Component'
              ) {
                hasReactComponent = true;
                addDebugSourceForClass(s, path.node, id);
              }
            }
          },
        });

        if (hasReactComponent) {
          return {
            code: s.toString(),
            map: s.generateMap({ hires: true }),
          };
        }
      } catch (error) {
        // 解析失败时静默跳过
        console.warn(`[react-source-tracker] Failed to parse ${id}:`, error);
      }

      return null;
    },
  };
}

/**
 * 判断是否为 React 组件函数
 */
function isReactComponent(node: t.FunctionDeclaration): boolean {
  if (!node.id) return false;
  return isReactComponentName(node.id.name);
}

/**
 * 判断名称是否符合 React 组件命名规范
 */
function isReactComponentName(name: string): boolean {
  return /^[A-Z]/.test(name);
}

/**
 * 为函数声明添加 _debugSource
 */
function addDebugSource(s: MagicString, node: t.FunctionDeclaration, filename: string) {
  if (!node.id) return;

  const debugSource = {
    fileName: filename,
    lineNumber: node.loc?.start.line || 1,
    columnNumber: node.loc?.start.column || 0,
  };

  // 在函数体开头添加 _debugSource 赋值
  if (node.body.body.length > 0) {
    const firstStatement = node.body.body[0];
    s.appendRight(
      firstStatement.start!,
      `// @debugSource ${JSON.stringify(debugSource)}\n`
    );
  }
}

/**
 * 为变量声明添加 _debugSource
 */
function addDebugSourceForVariable(s: MagicString, node: t.VariableDeclarator, filename: string) {
  if (!t.isIdentifier(node.id)) return;

  const debugSource = {
    fileName: filename,
    lineNumber: node.loc?.start.line || 1,
    columnNumber: node.loc?.start.column || 0,
  };

  // 在变量声明后添加注释
  s.appendRight(
    node.end!,
    ` // @debugSource ${JSON.stringify(debugSource)}`
  );
}

/**
 * 为类声明添加 _debugSource
 */
function addDebugSourceForClass(s: MagicString, node: t.ClassDeclaration, filename: string) {
  if (!node.id) return;

  const debugSource = {
    fileName: filename,
    lineNumber: node.loc?.start.line || 1,
    columnNumber: node.loc?.start.column || 0,
  };

  // 在类声明后添加注释
  s.appendRight(
    node.end!,
    ` // @debugSource ${JSON.stringify(debugSource)}`
  );
}
