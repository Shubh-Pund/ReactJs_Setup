import React from 'react'

export default function BasicCheckbox({ name, options, values = 0, onChange, className, error }) {
   // Ensure values is an array, if it's not, convert it
   const isChecked = values === 1;

   return (
     <div className="col-sm-6 col-md-6 col-lg-6 my-4">
       <div>
         {options.map((option, index) => (
           <label key={index}>
             <input
               type="checkbox"
               name={name}
               value={1}  // Send 1 when checked
               checked={isChecked}
               className='form-check-inline'
               onChange={onChange}
             />
             {option}
           </label>
         ))}
       </div>
       {error && <p className="text-danger">{error}</p>}
     </div>
   );
}
