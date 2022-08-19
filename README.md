# SignApp


```properties
npm install signapp
```

### useage

this code will put a signable canvas on the screen, it won't be visible just yet.

```js
import SignAture from "signapp";

function App() {
  return (
    <SignAture />
  );
};
```

for starters, you can add ANY prop value to this canvas, as is.<br/>
note: do not set height nor with in a css way, pass it as props.

```js
  <SignAture
    className={styles.form__canvas}
    style={{
      border: "1px solid black",
    }}
    height={500}
    width={300}
  />
```

Now, let's use this canvas.
you'll need to  pass a ref to control the canvas

```js
const SignAppRef = useRef(null);

...

<SignAture
  ref={SignAppRef}
  style={{
    border: "1px solid black",
  }}
  height={500}
  width={300}
/>
};
```

Now you have access to 2 functions ->
```js
<button onClick={() => console.log(SignAppRef.current.getImg())}>getImg</button>
// tip: this value can be used as a `src` attribute of an image.
```

```js
<button onClick={() => console.log(SignAppRef.current.clear())}>clear</button>
```

if you come across bugs, missing key feators, or you have a suggestion - please update me here on [issues](https://github.com/yishayhaz/signapp/issues).
