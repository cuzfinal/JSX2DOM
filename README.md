# A tool for trasforming JSX to DOM

Refer to [preact](https://github.com/developit/preact)

# usage:

### typescript:

tsconfig.json

```json
{
  ...,
  "jsx": "react",
  "jsxFactory": "JSX.createElement",
}
```

component.tsx

```javascript
import JSX from 'index'

const props = {
  style: {
    width: '50vw',
    backgroundColor: 'grey',
  },
  onClick(e) {console.log(e)},
}

export const component = <div {...props}>
  {Array(10).fill(1).map(v, i) => <p>
    {`text ${i}...`}
  <p>}
</div>
```