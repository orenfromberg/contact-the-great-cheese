import React from 'react';
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if(values.name.length > 255) {
        errors.name = 'Must be 255 characters or less'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.message) {
        errors.message = 'Required'
    } else if(values.message.length > 255) {
        errors.message = 'Must be 255 characters or less'
    }

    return errors
}

const renderField = ({
    name,
    input,
    label,
    type,
    meta: { touched, error, warning },
    subtext
}) => (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div>
                <input {...input} className={`form-control ${touched && error && 'is-invalid'}`} type={type} maxLength="255"/>
                {touched &&
                    ((error && <span className='invalid-feedback'>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                <small className="form-text text-muted">{subtext}</small>
            </div>
        </div>
    )

const MessageField = ({
    name,
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div>
            <textarea {...input} className={`form-control ${touched && error && 'is-invalid'}`} name={name} type={type} maxLength="255"></textarea>
            {touched &&
                ((error && <span className='invalid-feedback'>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
    )

const ContactPage = (props) => {
    const { handleSubmit, submitting } = props
    return (
        <div>
            <p className="App-intro">
              Please send us a message and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit}>
                <Field name="name" type="text" component={renderField} label="Name" />
                <Field name="email" type="email" subtext="We'll never share your email with anyone else." component={renderField} label="E-mail" />
                <Field name="message" type="textarea" component={MessageField} label="Message" />
                <div>
                    <button className="btn btn-primary" type="submit" disabled={submitting}>Contact a Representative</button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'contactPage',
    validate,
})(ContactPage);