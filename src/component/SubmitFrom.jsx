// app/components/SubmitForm.tsx  (or wherever you place it)
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';



const CONTACT_APPS_SCRIPT_URL = import.meta.env.VITE_CONTACT_APPS_SCRIPT_URL;

const schema = Yup.object({
  name: Yup.string().trim().min(2, 'Enter your full name').required('Name is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  phone: Yup.string()
    .trim()
    .matches(/^\+?[0-9()\-\s]{7,15}$/, 'Enter a valid phone number')
    .required('Phone is required'),
  message: Yup.string().trim().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

const SubmitForm = () => {
  const initialValues = { name: '', email: '', phone: '', message: '' };

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting }
  ) => {
    try {
      const res = await fetch(CONTACT_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          source: 'contact-form',
        }),
      });

      const data = await res.json(); // Apps Script returns JSON

      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Failed to submit form');
      }

      toast.success(data.message || 'Submitted successfully!');
      resetForm();
    } catch (err) {
      toast.error(err?.message || 'Failed to submit form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
        <div className="flex justify-center items-center mb-4">
            <Link to="/" className='btn btn-primary underline'>Go to Home</Link>
        </div>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Submit Form</h1>
        <p className="text-gray-600 mb-6">Fill the form and we’ll contact you soon.</p>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005522] border-gray-300"
                  disabled={isSubmitting}
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005522] border-gray-300"
                  disabled={isSubmitting}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005522] border-gray-300"
                  disabled={isSubmitting}
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005522] border-gray-300"
                  disabled={isSubmitting}
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-sm text-[#005522] text-[16px] bg-transparent border border-[#005522] font-bold hover:bg-[#005522] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting…' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SubmitForm;
