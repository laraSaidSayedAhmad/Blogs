import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface Credentials {
  email: string;
  username: string;
  password: string;
}

interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  password: string;
}

const initialCredentials = {
  email: "",
  password: "",
  username: "",
};

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const [credentials, setCredentials] =
    useState<Credentials>(initialCredentials);
  const { register, handleSubmit, reset } = useForm<Credentials>({});

  const onSiginUp: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const response = await onSiginup(credentials);
    if (response && response.error) {
      setError(response.error);
    }
  };
  const onSiginup = async (data: Credentials) => {
    const requestConfig: AxiosRequestConfig = {
      method: "post",
      url: "https://api.realworld.io/api/users",
      data: { user: data },
    };
    try {
      const { data: response } = await axios.request<User>(requestConfig);
    } catch (error: any) {
      return { error: error.response.data.message };
    }
    setCredentials(initialCredentials);
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <form onSubmit={onSiginUp}>
              <fieldset className="form-group">
                <label htmlFor="usename"></label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="username"
                  name="username"
                  required
                  value={credentials.username}
                  onChange={(event) =>
                    setCredentials({
                      username: event.target.value,
                      email: credentials.email,
                      password: credentials.password,
                    })
                  }
                />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="email"></label>
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="email"
                  name="email"
                  required
                  value={credentials.email}
                  onChange={(event) =>
                    setCredentials({
                      username: credentials.username,
                      email: event.target.value,
                      password: credentials.password,
                    })
                  }
                />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="password"></label>
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials({
                      username: credentials.username,
                      email: credentials.email,
                      password: event.target.value,
                    })
                  }
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
