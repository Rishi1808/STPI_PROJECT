import * as Yup from 'yup';

export const validationSchema = Yup.object({
    unitName: Yup.string().required('Unit Name is required'),
    contactPerson: Yup.string().required('Contact Person is required'),

    pan: Yup
        .string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
        .required('PAN number is required'),

    gst: Yup
        .string()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/, 'Invalid GST number')
        .required('GST number is required'),

    email: Yup
        .string()
        .email('Invalid email address')  // Yup has a built-in email validator
        .required('Email is required'),

    boardOfDirectors: Yup.string()
        .required('Board of Directors feild is required')
        .test('is-valid', 'Please provide at least one board member', value => {
            const directors = value?.split('\n').map(item => item.trim()).filter(item => item); // Split by newline and trim empty values
            return directors && directors.length > 0;
        }),

    // Bank Account Number: Must be numeric and between 9 and 18 digits
    AccountNo: Yup.string()
        .required('Bank Account Number is required')
        .matches(/^[0-9]{9,18}$/, 'Bank Account Number must be between 9 and 18 digits'),

    // Bank Name & Branch Address: Required and minimum length of 3
    bankName: Yup.string()
        .required('Bank Name and Branch Address are required')
        .min(3, 'Bank Name and Branch Address must be at least 3 characters long')
        .max(100, 'Bank Name and Branch Address must be at most 100 characters'),

    // Authorized Signatory: Required and minimum length of 3
    bankBranchAdd: Yup.string()
        .required('Authorized Signatory is required')
        .min(3, 'Authorized Signatory must be at least 3 characters long')
        .max(50, 'Authorized Signatory must be at most 50 characters'),
    dateOfVisit: Yup.date()
        .required('Date of Visit is required')
        .min(new Date(), 'Date of Visit cannot be in the past')
        .typeError('Please provide a valid date'),

});