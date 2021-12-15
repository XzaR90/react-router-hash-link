# React Router Hash Link

[![npm](https://img.shields.io/npm/dm/@xzar90/react-router-hash-link?label=npm)](https://www.npmjs.com/package/@xzar90/react-router-hash-link)
[![Publish](https://github.com/XzaR90/react-router-hash-link/actions/workflows/publish.yml/badge.svg)](https://github.com/XzaR90/react-router-hash-link/actions/workflows/publish.yml) [![CodeQL](https://github.com/XzaR90/react-router-hash-link/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/XzaR90/react-router-hash-link/actions/workflows/codeql-analysis.yml)

This is a solution to [React Router's issue of not scrolling to `#hash-fragments`](https://github.com/reactjs/react-router/issues/394#issuecomment-220221604) when using the `<Link>` component to navigate.

When you click on a link created with `react-router-hash-link` it will scroll to the element on the page with the `id` that matches the `#hash-fragment` in the link. This will also work for elements that are created after an asynchronous data load. Note that you must use React Router's `BrowserRouter` for this to work.

This is a fork of https://github.com/rafgraph/react-router-hash-link that can be used with react router v6.

---

## Basics

```shell
npm install --save react-router-hash-link
```

`react-router-dom 6` and `react 17` is a peer dependency.

---

### `<HashLink>`

```js
import { HashLink } from '@xzar90/react-router-hash-link';

...

// use it just like a RRv4/5 <Link>
// the `to` prop can be a string or an object, see RRv4/5 api for details
<HashLink to="/some/path#with-hash-fragment">Link to Hash Fragment</HashLink>
```

---

### `<NavHashLink>`

```js
import { NavHashLink } from '@xzar90/react-router-hash-link';

...

// use it just like a RRv4/5 <NavLink> (see RRv4/5 api for details)
// it will be active only if both the path and hash fragment match
<NavHashLink
  to="/some/path#with-hash-fragment"
  className={(props) => {
    return `${props.isActive ? 'isActive ' : ''}`;
  }}
  style={(props) => {
    return props.isActive ? { fontWeight: 'bold' } : {};
  }}
  // etc...
>Link to Hash Fragment</NavHashLink>
```

---

## Scrolling API

### `smooth: boolean`

- Smooth scroll to the element
- React Router Hash Link uses the native Element method `element.scrollIntoView()` for scrolling, and when the `smooth` prop is present it will call it with the smooth option, `element.scrollIntoView({ behavior: 'smooth' })`
- Note that not all browsers have implemented options for `scrollIntoView` - see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) and [Can I Use](https://caniuse.com/#feat=scrollintoview) - there is also a browser [polyfill for smooth scrolling](https://github.com/iamdustan/smoothscroll) which you can install separately so `smooth` will work in all browsers

```js
import { HashLink } from '@xzar90/react-router-hash-link';

...

<HashLink smooth to="/path#hash">
  Link to Hash Fragment
</HashLink>;
```

---

### `scroll: function`

- Custom scroll function called with the element to scroll to, e.g. `const myScrollFn = element => {...}`
- This allows you to do things like scroll with offset, use a specific smooth scrolling library, or pass in your own options to `scrollIntoView`

```js
import { HashLink } from '@xzar90/react-router-hash-link';

...

<HashLink
  to="/path#hash"
  scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'end' })}
>
  Link to Hash Fragment
</HashLink>;
```

---

### Scroll to top of page

- To scroll to the top of the page set the hash fragment to `#` (empty) or `#top`
- This is inline with the [HTML spec](https://html.spec.whatwg.org/multipage/browsing-the-web.html#target-element), also see [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Linking_to_an_element_on_the_same_page)

```js
import { HashLink } from '@xzar90/react-router-hash-link';

...

<HashLink to="/path#top">Link to Top of Page</HashLink>
// or
<HashLink to="#top">Link to Top of Page</HashLink>
```

---

### Scroll with offset

- To scroll with offset use a custom scroll function, one way of doing this can be found [here](https://github.com/rafgraph/react-router-hash-link/issues/25#issuecomment-536688104)

---

### `elementId: string`

- Scroll to the element with matching id
- Used instead of providing a hash fragment as part of the `to` prop, if both are present then the `elementId` will override the `to` prop's hash fragment
- Note that it is generally recommended to use the `to` prop's hash fragment instead of the `elementId`

---

## Custom `Link`

The exported components are wrapped versions of the `Link` and `NavLink` exports of react-router-dom. In some cases you may need to provide a custom `Link` implementation.

For example you may want to use a button, then you can wrap `button` with the `GenericHashLink`.

```jsx
import { GenericHashLink } from '@xzar90/react-router-hash-link';

const MyComponent = () => (
  <div>
    The default wont work for you?
    <GenericHashLink to="/faq#how-to-use-custom-link">
      <button>No problem</button>
    </GenericHashLink>
  </div>
);
```

---

## Focus Management

`react-router-hash-link` attempts to recreate the native browser focusing behavior as closely as possible.

The browser native behavior when clicking a hash link is:

- If the target element is not focusable, then focus is _moved_ to the target element, but the target element is not focused.
- If the target element is focusable (interactive elements and elements with a `tabindex`), then the target element is focused.

To recreate this `react-router-hash-link` does the following:

- For non-focusable elements, it calls `element.focus()` followed by `element.blur()` (using a temporary `tabindex` to ensure that the element can be focused programmatically) so that focus _moves_ to the target element but does not remain on it or trigger any style changes.
- For focusable elements, it calls `element.focus()` and leaves focus on the target element.

Note that you may find it useful to leave focus on non-interactive elements (by adding a `tabindex` of `-1`) to augment the navigation action with a visual focus indicator.
