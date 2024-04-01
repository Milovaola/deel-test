## What is the difference between Component and PureComponent? Give an example where it might break my app.
These are two ways to create components. In `Component`, the re-rendering will always be performed, whether its properties or state has changed or not. 
To avoid unnecessary rendering, the `shouldComponentUpdate()` method should be used. 
In `PureComponent`, this method is used automatically, which allows to shallowly compare the component's properties and state with previous values and not call the render method unnecessarily.
But using `PureComponent` can cause problems if the properties or state of a component are mutable objects such as arrays or objects and they change by reference, 
`PureComponent` may not detect these changes, or the property or state is a complex object, the shallow comparison may be incomplete.

## Context + ShouldComponentUpdate might be dangerous. Why is that?
Using `shouldComponentUpdate` with context in React can cause problems because of the unexpected consequences of often re-rendering all components that consume context when its value changes. 
This is because `shouldComponentUpdate` can incorrectly detect whether a component needs to be updated, returning `false` even if the context change is important to its rendering. 
As a result, the component may get a deprecated interface or exhibit unexpected behaviour. 

## Describe 3 ways to pass information from a component to its PARENT.
1. **Using Callbacks**: The parent can pass a callback function to the child component through props. The child component can then call this callback function and pass data to it.
2. **Context**: A parent component can provide a context that will be available to child components. The child component can access the value of the context and use it to pass information to the parent component. 
3. **Render Props**: The parent component can pass a function as a prop to the child component. The child component can then call this function and pass data to it.

## Give 2 ways to prevent components from re-rendering.
1. **shouldComponentUpdate()**: This method can be used to prevent a component from re-rendering by returning `false` if the component does not need to be updated.
2. **React.memo()**: This higher-order component can be used to prevent a functional component from re-rendering if its props have not changed.

## What is a fragment and why do we need it? Give an example where it might break my app.
Fragments allow to group child elements without creating additional nodes in the DOM. They look like an empty `<React.Fragment>` tag or `<>` for short. Using fragments can improve performance and reduce unnecessary HTML code.
Using fragments can cause potential problems with CSS or JavaScript selectors, especially if styles or scripts expect a certain DOM structure. Fragments can change this structure, and your styles or scripts may no longer work correctly.

## Give 3 examples of the HOC pattern.
1. **withRouter**: A higher-order component that provides the `history`, `location`, and `match` props to the wrapped component.
2. **withLoadingIndicator**: A higher-order component that displays a loading indicator while the wrapped component is fetching data.
3. **connect**: A higher-order component from `react-redux` that connects a React component to a Redux store.

## What's the difference in handling exceptions in promises, callbacks and async...await?
* `Promises` provide a mechanism for handling asynchronous operations, using then() methods for successful execution and catch() methods for error handling.
* `Callbacks` are usually passed to functions as arguments, where the first argument represents the error, if any. 
* `Async/await` offers syntactic sugar for writing asynchronous code, using the try/catch construct for error handling 

## How many arguments does setState take and why is it async
`setState` takes two arguments: an object that represents the new state and an optional callback function that will be executed after the state has been updated.
`setState` is asynchronous because React optimises the state update process to improve performance. For example, if multiple setState calls happen within a single event loop (for example, in response to multiple user actions), React will combine these state updates and perform them in a single update to reduce the number of component redraws.

## List the steps needed to migrate a Class t oFunction Component.
1. Copy all logic and methods from the class component inside the functional component
2. Remove the constructor and all lifecycle methods such as `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`. Instead, use the hooks `useState` to control the state of the component and `useEffect` to emulate the lifecycle methods.
3. After migration, we should test the functional component to ensure that it works correctly and as expected.

## List a few ways styles can be used with components.
1. **Inline Styles**: Styles can be applied directly to a component using the `style` attribute.
2. **CSS Classes**: Styles can be applied to a component using CSS classes.
3. **CSS Modules**: Styles can be imported and applied to a component using CSS modules.
4. **Styled Components**: Styles can be defined using styled-components and applied to a component.

## How to render an HTML string coming from the server.
We can use `dangerouslySetInnerHTML` to display HTML strings received from the server in React. This method allows to insert raw HTML code into React components.
However, using `dangerouslySetInnerHTML` can be dangerous and can lead to XSS attacks if the HTML code contains harmful scripts. Therefore, it is recommended to use this method only when the HTML code is sourced from a trusted source.