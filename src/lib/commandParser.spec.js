import { parseCommand } from './commandParser';

describe('parseCommand', () => {
  describe('simple value assignment', () => {
    context('with valid value', () => {
      const ast = parseCommand('A0 = 5');

      describe('ast', () => {
        it('has type assignment', () => {
          expect(ast.type).toEqual('assignment');
        });

        describe('expression', () => {
          it('has type "value"', () => {
            expect(ast.expression.type).toEqual('value');
          });

          it('has correct value', () => {
            expect(ast.expression.value).toEqual(5);
          });
        });
      });
    });
    it ('raises error when value is invalid', () => {
      expect(() => {
        parseCommand('A0 = BFS');
      }).toThrow();
    });
  });
  describe('with whitespace separated', () => {
    const ast = parseCommand('A0 = A1 + A2');

    it('parses simple assignment', () => {
      expect(ast.type).toEqual('assignment');
    });
    it('assigns correct target cell', () => {
      expect(ast.target).toEqual('A0');
    });
    describe('expression', () => {
      let expression = ast.expression;

      it('has type equation', () => {
        expect(expression.type).toEqual('equation');
      });

      it('has correct operation', () => {
        expect(expression.operation).toEqual('+');
      });

      it('has correct left child', () => {
        expect(expression.left).toEqual('A1');
      });

      it('has correct right child', () => {
        expect(expression.right).toEqual('A2');
      });
    });
  });

  describe('without separating whitespace', () => {
    const ast = parseCommand('A0=A1+A2');

    it('parses simple assignment', () => {
      expect(ast.type).toEqual('assignment');
    });
    it('assigns correct target cell', () => {
      expect(ast.target).toEqual('A0');
    });
    describe('expression', () => {
      let expression = ast.expression;

      it('has correct operation', () => {
        expect(expression.operation).toEqual('+');
      });

      it('has correct left child', () => {
        expect(expression.left).toEqual('A1');
      });

      it('has correct right child', () => {
        expect(expression.right).toEqual('A2');
      });
    });
  });
});
