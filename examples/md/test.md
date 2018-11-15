![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png){height=50}

### 代码块
``` python {height=50}
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

