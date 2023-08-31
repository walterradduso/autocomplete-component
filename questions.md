1.  What is the difference between Component and PureComponent? Give an example where it might break my app.

    **A:** PureComponent has or implements shouldComponentUpdate, which allows you to compare props and states and gives you the possibility to avoid unnecessary re-renders. If your React component's render function renders the same result given the same props and state, you can use PureComponent to get better performance.

2.  Context + ShouldComponentUpdate might be dangerous. Why is that?

    **A:** Using shouldComponentUpdate with Context can cause problems or performance issues. These two features can work against each other and cause inconsistencies. The shouldComponentUpdate can prevent necessary updates, while changes in Context can override this and cause child components to be re-rendered. This can cause debugging problems and is difficult to maintain.

3.  Describe 3 ways to pass information from a component to its PARENT.

    **A:**

    1. <u>Callback Functions</u>: Pass callback functions as props from parent to child.
    2. <u>Context</u>: Used to pass data through the component tree to avoid the prop drilling in react, though not strictly for child-to-parent.
    3. <u>Global state</u>: For example, "redux" or "mobx", is used to pass data to the entire tree of React components, although this is often used for more complex state management.

4.  Give 2 ways to prevent components from re-rendering.

    **A:**

    1. <u>shouldComponentUpdate</u> in class components.
    2. <u>React.memo</u> in functional components.

5.  What is a fragment and why do we need it? Give an example where it might break my app.

    **A:** Fragment is a wrapper used to group multiple elements without adding an extra node to the DOM. It's useful when you want to return multiple elements from a component's render method without a parent element. We need it to get a cleaner DOM and to wrap multiple elements without modifying the DOM.

    An example could be when you try to add a style to the children of a container, this would "break" the app, at least the styles would not be applied as expected:

    ```css
    .container > * {
      margin: 10px;
    }
    ```

    ```js
    function App() {
      return (
        <div className="container">
          <React.Fragment>
            <div>Item 1</div>
            <div>Item 2</div>
          </React.Fragment>
        </div>
      );
    }
    ```

6.  Give 3 examples of the HOC pattern.

    **A:**

    - **withLoader**

      ```js
      function withLoader(WrappedComponent) {
        return function EnhancedComponent({ isLoading, ...props }) {
          if (isLoading) {
            return <div>Loading...</div>;
          }

          return <WrappedComponent {...props} />;
        };
      }

      const UserListWithLoader = withLoader(UserList);

      // Usage
      <UserListWithLoader isLoading={true} />;
      ```

    - **withAuth**

      ```js
      function withAuth(WrappedComponent) {
        return function EnhancedComponent({ isLoggedIn, ...props }) {
          if (!isLoggedIn) {
            return <div>Not authorized</div>;
          }

          return <WrappedComponent {...props} />;
        };
      }

      const AdminPageWithAuth = withAuth(UserList);

      // Usage
      <AdminPageWithAuth isLoggedIn={false} />;
      ```

    - **withStyle**

      ```js
      function withStyle(WrappedComponent, style) {
        return function EnhancedComponent(props) {
          return (
            <div style={style}>
              <WrappedComponent {...props} />
            </div>
          );
        };
      }

      const style = { color: 'red' };
      const RedTextComponent = withStyle(MyComponent, style);

      // Usage
      <RedTextComponent />;
      ```

    - **withRouter** from `react-router-dom`.
    - **connect** from `react-redux`.
    - **withTheme** from `styled-components`.
    - **withTranslation** from `react-i18next`.

7.  What's the difference in handling exceptions in promises, callbacks and async…await?

    **A:**

    - In <u>Callbacks</u>, we have the error in the first argument of the callback function, and that's the error handling.
    - In <u>Promises</u> we use "then()" on success and ".catch()" for error handling.
    - In <u>Async/Await</u> we use "try/catch", in this catch we have the error handling.

8.  How many arguments does setState take and why is it async.

    **A:** setState() takes two arguments, the first one it is the state and the second one it is the callback function to update the first argument. It is async for performance reasons, React manages multiple setState calls at the same time, if they were synchronous it could make leave the browser unresponsive.

9.  List the steps needed to migrate a Class to Function Component.

    **A:** It depends on the complexity of the component, but in general:

    - Change the component signature from class to function.
    - Replace "this.props" with "props".
    - Replace "this.state" and "this.setState" with "useState".
    - Replace lifecycle methods like "componentDidMount", "componentDidUpdate" and "componentWillUnmount" with "useEffect".
    - If it has context, replace "this.context" with "useContext".
    - If it has refs, replace "this.refs" with "useRef".

10. List a few ways styles can be used with components.

    **A:**

    - Inline styling
    - CSS stylesheets
    - CSS modules
    - Styled components
    - Tailwind CSS

11. How to render an HTML string coming from the server.

    **A:** You can use the "dangerouslySetInnerHTML" attribute.
