import React from "react";
import axios from "axios";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
    department: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htlmfor="">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htlmfor="">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <label htlmfor="">Department</label>
          <input
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div>
          <button type="submit">Sign up</button>
        </div>
      </form>
    );
  }
}

export default Signup;

// export default Signup;
