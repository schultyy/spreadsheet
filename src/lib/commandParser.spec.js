import { parseCommand } from './commandParser';

describe('parseCommand', () => {
  describe('simple value assignment', () => {
    context('with a number', () => {
      const ast = parseCommand('A0 = 5');

      describe('ast', () => {
        it('has type assignment', () => {
          expect(ast.type).toEqual('assignment');
        });

        describe('expression', () => {
          it('has type "number"', () => {
            expect(ast.expression.type).toEqual('number');
          });

          it('has correct value', () => {
            expect(ast.expression.value).toEqual(5);
          });
        });
      });
    });
    context('with a string', () => {
      const ast = parseCommand('A0 = Field description');

      describe('ast', () => {
        it('has type assignment', () => {
          expect(ast.type).toEqual('assignment');
        });

        describe('expression', () => {
          it('has type "string"', () => {
            expect(ast.expression.type).toEqual('string');
          });

          it('has correct value', () => {
            expect(ast.expression.value).toEqual('Field description');
          });
        });
      });
    });
  });

  describe('equation assignment with whitespace separated', () => {
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

  describe('equation assignment without separating whitespace', () => {
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
