export default function FromPreview({ formData }) {
    return (
      <div>
        <h2>Form Preview</h2>
        <p><strong>Name:</strong> {formData.name}</p>
        <p>< strong>Email:</> {formData.email}</p>
         
      </div>
    );
  }
  