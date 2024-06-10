import React, { useState } from 'react';
import { z, ZodSchema } from 'zod';
import { sendEnquiryToDayDreamers } from '../api/emailCalls';
import { ComponentStatus, EnquiryFormSchema } from "../types/index"
import { AUTO_HIDE_MODAL_DURATION } from '../utils/globals';

const formSchema: ZodSchema<EnquiryFormSchema> = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(8, "Mobile number must be at least 8 digits"),
  favouriteColour: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Invalid color format"),
  enquiryType: z.enum(["General", "Booking", "Management", "Scathing Review", "Content or Merch Request", "Divulge Covert Information"]),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  angerLevel: z.string().nullable(), // For Scathing Review
  suggestedPunishment: z.string().nullable(), // For Scathing Review
  codeName: z.string().nullable(), // For Divulge Covert Information
  levelOfSecrecy: z.enum(["Top Secret", "For Your Eyes Only", "Confidential", "Public Knowledge"]).nullable(), // For Divulge Covert Information
});

type EnquiryFormComponent = {
  submissionStatus: ComponentStatus,
  setSubmissionStatus: React.Dispatch<React.SetStateAction<ComponentStatus>>,
}

export default function EnquiryForm({ submissionStatus,
  setSubmissionStatus }: EnquiryFormComponent) {

  const defaultFormFields: EnquiryFormSchema = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    favouriteColour: '#ffffff',
    enquiryType: 'General',
    subject: '',
    message: '',
    angerLevel: null,
    suggestedPunishment: null,
    codeName: null,
    levelOfSecrecy: null,
  }

  const [formData, setFormData] = useState<EnquiryFormSchema>(defaultFormFields);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setErrors((errors) => ({ ...errors, [name]: "" }));

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = async () => {
    const result = formSchema.safeParse(formData);
    if (result.success) {
      // console.log("Form is valid:", result.data);
      setErrors({});
      setSubmissionStatus("loading")
      let res = null;
      try {
        res = await sendEnquiryToDayDreamers(result.data)
        if (res.status === 200 || res.status === 201 || res.status === 202) {
          setSubmissionStatus("ok")
          setFormData(() => defaultFormFields)
        } else {
          throw Error("New Enquiry request was not ok")
        }
      } catch (error) {
        setSubmissionStatus("error")
        console.error(error)
      }
    } else {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        newErrors[error.path[0] as string] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
  };

  interface CustomCSSProperties extends React.CSSProperties {
    '--favourite-colour'?: string;
  }

  const customStyle: CustomCSSProperties = {
    "--favourite-colour": formData.favouriteColour
  }

  return (
    <>
      <div className='enquiry-form-container' style={customStyle}  >
        <div className="enquiry-form-filter" />
        <div className="enquiry-form-backdrop" />
        <h1>Contact us!</h1>
        <form onSubmit={handleSubmit}>
          <div className="first-last-name">
            <div className="field-container">
              <div className='input-container'>
                <label htmlFor='firstName' className="placeholder">First Name</label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder=" "
                />
              </div>
              {errors.firstName ? <span className="error">{errors.firstName}</span> : null}
            </div>
            <div className="field-container">
              <div className='input-container'>
                <label htmlFor='lastName' className="placeholder">Last Name</label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder=" "
                />
              </div>
              {errors.lastName ? <span className="error">{errors.lastName}</span> : null}
            </div>
          </div>
          <div className="field-container">
            <div className='input-container'>
              <label htmlFor='email' className="placeholder">Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
              />
            </div>
            {errors.email ? <span className="error">{errors.email}</span> : null}
          </div>
          <div className="field-container">
            <div className='input-container'>
              <label htmlFor='mobileNumber' className="placeholder">Mobile Number</label>
              <input
                type='text'
                id='mobileNumber'
                name='mobileNumber'
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder=" "
              />
            </div>
            {errors.mobileNumber ? <span className="error">{errors.mobileNumber}</span> : null}
          </div>

          <div className="favourite-colour-enquiry-type">
            <div className='input-container'>
              <label htmlFor='favouriteColour' className="placeholder">Favourite Colour</label>
              <input
                type='color'
                id='favouriteColour'
                name='favouriteColour'
                value={formData.favouriteColour}
                onChange={handleChange}
              />
            </div>
            {errors.favouriteColour ? <span className="error">{errors.favouriteColour}</span> : null}

            <div className='input-container'>
              <label htmlFor='enquiryType' className="placeholder">Enquiry Type</label>
              <select
                id='enquiryType'
                name='enquiryType'
                value={formData.enquiryType}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Booking">Booking</option>
                <option value="Management">Management</option>
                <option value="Scathing Review">Scathing Review</option>
                <option value="Content or Merch Request">Content or Merch Request</option>
                <option value="Divulge Covert Information">Divulge Covert Information</option>
              </select>
            </div>
          </div>
          <div className="field-container">
            <div className='input-container'>
              <label htmlFor='subject' className="placeholder">Subject</label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
              />
            </div>
            {errors.subject ? <span className="error">{errors.subject}</span> : null}
          </div>
          <div className="field-container">
            <div className='input-container'>
              <label htmlFor='message' className="placeholder">Message</label>
              <textarea
                id='message'
                name='message'
                placeholder='  '
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            {errors.message ? <span className="error">{errors.message}</span> : null}
          </div>
          {formData.enquiryType === "Scathing Review" ? (
            <>
              <div className="field-container">
                <div className='input-container'>
                  <label htmlFor='angerLevel' className="placeholder">Anger Level (1 to 10)</label>
                  <input
                    type='number'
                    id='angerLevel'
                    name='angerLevel'
                    value={formData.angerLevel ?? ''}
                    onChange={handleChange}
                    placeholder=" "
                  />
                </div>
                {errors.angerLevel ? <span className="error">{errors.angerLevel}</span> : null}
              </div>
              <div className="field-container">
                <div className='input-container'>
                  <label htmlFor='suggestedPunishment' className="placeholder">Suggested Punishment for the Band</label>
                  <input
                    type='text'
                    id='suggestedPunishment'
                    name='suggestedPunishment'
                    value={formData.suggestedPunishment ?? ''}
                    onChange={handleChange}
                    placeholder=" "
                  />
                </div>
                {errors.suggestedPunishment ? <span className="error">{errors.suggestedPunishment}</span> : null}
              </div>
            </>
          ) : null}
          {formData.enquiryType === "Divulge Covert Information" ? (
            <div className="code-name-level-of-secrecy">
              <div className='input-container'>
                <label htmlFor='codeName' className="placeholder">Code Name</label>
                <input
                  type='text'
                  id='codeName'
                  name='codeName'
                  value={formData.codeName ?? ''}
                  onChange={handleChange}
                  placeholder=" "
                />
              </div>
              {errors.codeName ? <span className="error">{errors.codeName}</span> : null}

              <div className='input-container'>
                <select
                  id='levelOfSecrecy'
                  name='levelOfSecrecy'
                  value={formData.levelOfSecrecy ?? ''}
                  onChange={handleChange}
                >
                  <option value="Top Secret">Top Secret</option>
                  <option value="For Your Eyes Only">For Your Eyes Only</option>
                  <option value="Confidential">Confidential</option>
                  <option value="Public Knowledge">Public Knowledge</option>
                </select>
              </div>
              {errors.levelOfSecrecy ? <span className="error">{errors.levelOfSecrecy}</span> : null}
            </div>
          ) : null}
          <button type="submit" disabled={submissionStatus === "loading" ? true : false}>Submit</button>
        </form>
      </div>
    </>
  );
}
