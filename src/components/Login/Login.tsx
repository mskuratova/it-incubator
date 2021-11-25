import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { Input } from "../common/FormControls/FormsControls";
import {connect} from "react-redux";
import { login } from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import { useFormik } from 'formik';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
type PropsType = {
    login: string |null |any
    isAuth: boolean
}

const Login = (props: PropsType) => {
    const onSubmit = (formData:FormDataType) => {
        props.login(formData.login, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <div>
                <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
            />
            </div>
            <div>
            <input
                id ="password"
                type="password"
                {...formik.getFieldProps("password")}
            />
            </div>
            <div>
                <input type={"checkbox"}
                       id = "rememberMe"
                       {...formik.getFieldProps("rememberMe")}
                />
            </div>

            <button type="submit">Submit</button>
        </form>
//          <form onSubmit={props.handleSubmit}>
//              <div>
//                  <Field placeholder={"Login"} name={"login"}
//                          validate={[require]}
//                      component={Input}
//                  />
//              </div>
//              <div>
//                  <Field placeholder={"Password"} name={"password"} type={"password"}
//                         // validate={[require]}
//                         component={Input}/>
//              </div>
//              <div>
//                  <Field type={"checkbox"} name={"rememberMe"}component={Input}/> remember me
//             </div>
//              <div>
//                  <button>Login</button>
//              </div>
//          </form>
    )
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const mapStateToProps =(state:AppStateType) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, {login}) (Login);