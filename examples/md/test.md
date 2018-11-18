
``` python test=1 a=2
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```

$$	x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$