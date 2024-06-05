import React, { useEffect, useState } from 'react';
import { z, ZodSchema } from 'zod';

type EnquiryType = "General" | "Booking" | "Management" | "Scathing Review" | "Content or Merch Request" | "Divulge Covert Information";

type SecretEnquiryType = "Top Secret" | "For Your Eyes Only" | "Confidential" | "Public Knowledge";

type EnquiryForm = {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  favouriteColour: string;
  enquiryType: EnquiryType;
  subject: string;
  message: string;
  angerLevel: number | null; // For Scathing Review
  suggestedPunishment: string | null; // For Scathing Review
  codeName: string | null; // For Divulge Covert Information
  levelOfSecrecy: SecretEnquiryType | null; // For Divulge Covert Information
};

const formSchema: ZodSchema<EnquiryForm> = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(8, "Mobile number must be at least 8 digits"),
  favouriteColour: z.string().regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Invalid color format"),
  enquiryType: z.enum(["General", "Booking", "Management", "Scathing Review", "Content or Merch Request", "Divulge Covert Information"]),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  angerLevel: z.number().min(1).max(10).nullable(), // For Scathing Review
  suggestedPunishment: z.string().nullable(), // For Scathing Review
  codeName: z.string().nullable(), // For Divulge Covert Information
  levelOfSecrecy: z.enum(["Top Secret", "For Your Eyes Only", "Confidential", "Public Knowledge"]).nullable(), // For Divulge Covert Information
});

type FormFields = {
  id: keyof EnquiryForm,
  label: string,
  type: "text" | "email" | "color" | "select" | "textarea" | "number",
  options?: EnquiryType[] | SecretEnquiryType[],
  dependsOn?: EnquiryType
}[]

const formFields: FormFields = [
  { id: 'firstName', label: 'First Name', type: 'text' },
  { id: 'lastName', label: 'Last Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'mobileNumber', label: 'Mobile Number', type: 'text' },
  { id: 'favouriteColour', label: 'Favourite Colour', type: 'color' },
  { id: 'enquiryType', label: 'Enquiry Type', type: 'select', options: ["General", "Booking", "Management", "Scathing Review", "Content or Merch Request", "Divulge Covert Information"] },
  { id: 'subject', label: 'Subject', type: 'text' },
  { id: 'message', label: 'Message', type: 'textarea' },
  { id: 'angerLevel', label: 'Anger Level (1 to 10)', type: 'number', dependsOn: 'Scathing Review' },
  { id: 'suggestedPunishment', label: 'Suggested Punishment for the Band', type: 'text', dependsOn: 'Scathing Review' },
  { id: 'codeName', label: 'Code Name', type: 'text', dependsOn: 'Divulge Covert Information' },
  { id: 'levelOfSecrecy', label: 'Level of Secrecy', type: 'select', options: ["Top Secret", "For Your Eyes Only", "Confidential", "Public Knowledge"], dependsOn: 'Divulge Covert Information' },
];

export default function EnquiryForm() {
  const [formData, setFormData] = useState<EnquiryForm>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    favouriteColour: '#000000',
    enquiryType: 'General',
    subject: '',
    message: '',
    angerLevel: null,
    suggestedPunishment: null,
    codeName: null,
    levelOfSecrecy: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const result = formSchema.safeParse(formData);
    if (result.success) {
      console.log("Form is valid:", result.data);
      setErrors({});
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

  useEffect(() => {
    console.log(formData.enquiryType)
  }, [])

  return (
    <div className='enquiry-form-container'>
      <form onSubmit={handleSubmit} className='form'>
        <>
          {formFields
            .filter(field =>
              field.dependsOn !== "Divulge Covert Information" &&
              field.dependsOn !== "Scathing Review")
            .map((field) => (
              <div key={field.id} className='input-container'>
                <label htmlFor={field.id} class="placeholder">{field.label}:</label>
                <div className="cut"></div>
                {field.type === 'select' ? (
                  <select
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof EnquiryForm] ?? ""}
                    onChange={handleChange}
                  >
                    {field.options && field.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof EnquiryForm] ?? ""}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof EnquiryForm] ?? ""}
                    onChange={handleChange}
                    placeholder=" "
                  />
                )}
                {errors[field.id] && <span>{errors[field.id]}</span>}
              </div>
            ))}
        </>
        <>
          {formData.enquiryType === "Scathing Review" ? (
            formFields
              .filter(field => field.dependsOn === "Scathing Review")
              .map(field => (
                <div key={field.id} className='input-container'>
                  <label htmlFor={field.id}>{field.label}:</label>
                  <div className="cut"></div>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id as keyof EnquiryForm] ?? ""}
                    onChange={handleChange}
                  />
                  {errors[field.id] && <span>{errors[field.id]}</span>}
                </div>
              ))
          ) : formData.enquiryType === "Divulge Covert Information" ? (
            formFields
              .filter(field => field.dependsOn === "Divulge Covert Information")
              .map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id}>{field.label}:</label>
                  {field.type === "select" ? (
                    <select
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof EnquiryForm] ?? ""}
                      onChange={handleChange}
                    >
                      {field.options && field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      value={formData[field.id as keyof EnquiryForm] ?? ""}
                      onChange={handleChange}
                    />
                  )}
                  {errors[field.id] && <span>{errors[field.id]}</span>}
                </div>
              ))
          ) : null}
        </>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

};
