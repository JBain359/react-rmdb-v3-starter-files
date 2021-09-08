import React from "react";

// index.js is an entry point
// so we need to inject our components into the html file
// using the root <div>
import ReactDOM from "react-dom";

// CSS
import "./index.css";

//Get some books that we can refer to
import { books } from "./books";

// For react to know that this function represents a component, we capitalize the name
// This is a stateless functional component
// we must always return some html, actually called "JSX"

// this is one way to create the function
function Greeting() {
  // We can create nested elements, but not adjecent ones
  // Work arounds?
  // we can surround our component with <div></div>, or some semantic equivalent
  // or we can use <React.Fragment></React.Fragment> which act like <div>s but are ignored by the browser
  // the shorthand for React.Fragment would be <></>

  return (
    <>
      <h4>This is Joe Bain, and this is my first component!</h4>
      <h4>This is Damian Bain, and this is my first component!</h4>
    </>
  );

  // JSX Rules
  // return single element
  // use html sematnic tags  -> div/section/article or fragment
  // use camelCase for html attributes
  // -> className instead of class
  // every element must be closed
  // -> <img/> instead of <img>
  // formatting -> enclose your JSX in () after the return statement
}

// Which is a shorthand way of doing it this is another way
// const Greeting = () => {
//   return React.createElement(
//     "div",
//     {},
//     React.createElement("h1", {}, "hello world")
//   );
// };

function NestedGreeting() {
  //we nest our component functions like so
  <>
    <Person />
    <h4>This is Damian Bain, and this is my first component!</h4>
  </>;
}

// this is a component that will be used by another
const Person = () => {
  <h4>This is Joe Bain, and this is my first component!</h4>;
};

// convert the books into JSX so that we can easily use them
const wrappedBooks = books.map((book) => {
  // alternatives:
  // <Book key = {book.id} book = {book}>
  // Then use props.book in Book(props) to unpack the object properties

  // <Book key = {book.id} {...book}>
  // using the spread operator as a short hand for what is shown below
  return (
    <Book
      key={book.id}
      img={book.img}
      title={book.title}
      author={book.author}
    />
  );
});

console.log(wrappedBooks);

function Booklist() {
  return <section className="booklist">{wrappedBooks}</section>;
}
//alternatively you can use function Book(img, author, title) to get the properties
function Book(props) {
  const { img, author, title } = props;

  // children is a built in property, it needn't be specified
  // it refers to the tags between the opening and closing
  // tags of the component created
  const { children } = props;

  const clickHandler = (e) => {
    // e represents the event itself
    // this is useful for getting information about the
    // component that was just interacted with
    // using 'e' as the parameter is just convention
    console.log(e);
    console.log(e.target);
    alert("Hello World!");
  };

  const passArgumentExample = (arg) => {
    console.log(arg);
  };

  return (
    <article className="book">
      <img src={img} alt="" />
      <h1>{title}</h1>

      {/* The format for inline css is a bit different than standard This is
      because we are actuall writing JS Also note that this inline css will
      overwrite css in the .css file */}

      <h1
        style={{ color: "#617d98", fontSize: "0.75rem", marginTop: "0.25rem" }}
      >
        {author}
      </h1>
      <button type="button" onClick={clickHandler}>
        Click Me
      </button>
      <button
        type="button"
        onClick={() =>
          passArgumentExample("I'm an argument being passed in JSX!")
        }
      >
        Passing argument
      </button>
      {/* If a property isn't set when the component is created
      the value will be null, and thus wont display. 
      The tag will still be in the DOM however, just empty*/}
      <p>{props.notHere}</p>
      {children}
    </article>
  );
}

function Image() {
  return (
    <img
      src="https://images-na.ssl-images-amazon.com/images/I/51yrFytHQlL._AC_SX368_.jpg"
      alt=""
    />
  );
}

// We call our greeting function by placing it in a tag!
// this tag will self close
// alternatively we can use the familiar <Greeting></Greeting>
// first argument: what to render, second argument: where to render it
ReactDOM.render(<Booklist />, document.getElementById("root"));
