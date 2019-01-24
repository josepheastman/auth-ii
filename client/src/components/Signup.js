import React from "react";
import axios from "axios";

// class Signup extends React.Component {
//   state = {
//     username: "",
//     password: ""
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div>
//           <label htlmfor="">Username</label>
//           <input
//             name="username"
//             value={this.state.username}
//             onChange={this.handleInputChange}
//             type="text"
//           />
//         </div>
//         <div>
//           <label htlmfor="">Password</label>
//           <input
//             name="password"
//             value={this.state.password}
//             onChange={this.handleInputChange}
//             type="text"
//           />
//         </div>
//         <div>
//           <button type="submit">Sign up</button>
//         </div>
//       </form>
//     );
//   }

//   handleInputChange = event => {
//     const { username, value } = event.target;
//     this.setState({ [username]: value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

//     axios
//       .post(endpoint, this.state)
//       .then(res => {
//         localStorage.setItem("jwt", res.data.token);
//       })
//       .catch(err => console.error(err));
//   };
// }

// export default Signup;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  submitChange = e => {
    e.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => console.error(err));
  };

  handleInputChange = ev => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  render() {
    return (
      <div>
        <h2>Create new account:</h2>
        <form onSubmit={this.submitChange}>
          <input
            onChange={this.handleInputChange}
            placeholder="Username"
            value={this.state.username}
            name="username"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Password"
            value={this.state.password}
            name="password"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Signup;
