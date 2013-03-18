
# views

  Allows you to specify a function and data to invoke for a DOM
  Element.

## Examples

  Invokes the `doStuff` function, passing it this element.
  ```html
  <div data-fn="doStuff"></div>
  ```

  Invokes the `doStuff` function, passing it this element
  *and* the data referred to at `data.theStuff`.
  ```html
  <div data-fn="doStuff" data-scope="data.theStuff"></div>
  ```

## Goal
  The goal is to instantiate Views and bind Models via the DOM.
  It's a lot simpler if your app's JavaScript exposes behaviour
  which can be tapped into from your HTML. This reversed coupling
  between your JS and your HTML is an approach
  also found in modern frameworks such as Angular and Ember.

  Works best for simple "Add X behaviour to Y Element, using
  Z data". Use traditional imperative invokation for more
  advanced instantiation.

## Installation

    $ component install timoxley/domstantiate

## Example

```html

<div data-scope="user" data-fn="views.UserView">
  <!--
  This could be any kind of template content. in this case,
  we're using component/reactive.
  -->
  <h2 data-text="name | capitalize"></h2>
</div>
<script>
  var DOMstantiate = require('domstantiate')
  var reactive = require('component-reactive')
  // Create a standard "View" class.
  function UserView(el, model) {
    if (!(this instanceof UserView)) return new UserView(el, model)
    this.el = el
    this.model = model
    reactive(this.el, this.model, this)
  }

  UserView.prototype.capitalize = function capitalize(str) {
    return str.toUpperCase()
  }


  // Create a namespace for lookups from
  // the DOM
  var app = {
    users: [
      {name: 'Tim'},
      {name: 'Bob'}
    ],
    user: function() {
      return this.users[0]
    },
    views: {
      UserView: UserView
    }
  }
  // use this namespace when looking up scopes and functions
  DOMstantiate(app)
</script>
```

## License

  MIT
