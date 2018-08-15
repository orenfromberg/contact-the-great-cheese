import React from 'react';
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }

    // if (!values.username) {
    //     errors.username = 'Required'
    // } else if (values.username.length > 15) {
    //     errors.username = 'Must be 15 characters or less'
    // }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    // if (!values.age) {
    //     errors.age = 'Required'
    // } else if (isNaN(Number(values.age))) {
    //     errors.age = 'Must be a number'
    // } else if (Number(values.age) < 18) {
    //     errors.age = 'Sorry, you must be at least 18 years old'
    // }

    if (!values.phone) {
        errors.phone = 'Required'
    }
    //todo validate phone number

    if (!values.message) {
        errors.message = 'Required'
    } else if(values.message.length > 255) {
        errors.message = 'Must be 255 characters or less'
    }

    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({
    name,
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div>
            <label htmlFor={name}>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
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
    <div>
        <label htmlFor={name}>{label}</label>
        <div>
            <textarea {...input} name={name} placeholder={label} type={type} maxLength="255"></textarea>
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>
    )

const ContactPage = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="name" type="text" component={renderField} label="Name" />
            <Field name="email" type="email" component={renderField} label="E-mail" />
            <Field name="phone" type="tel" component={renderField} label="Phone Number" />
            <Field name="message" type="textarea" component={MessageField} label="Message" />
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'contactPage',
    validate,
    warn
})(ContactPage);