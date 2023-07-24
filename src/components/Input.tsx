import { CSSProperties } from "react";
import { Field, ErrorMessage } from "formik";

interface CustomInputProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
  label: string;
  style?: CSSProperties;
}

export const Input = ({
  name,
  type,
  required,
  label,
  style,
  placeholder,
}: CustomInputProps) => {
  return (
    <div style={style}>
      <label htmlFor={name}>{label}</label>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

// import { FastField, ErrorMessage } from "formik";
// // import { inputProps } from "../types/inputType";
// // import React from "react";

// export const Input = ({
//   name,
//   label,
//   value,
//   special,
//   type,
//   readonly,
//   required,
//   style,
//   speciallabel,
// }: any) => {
//   return (
//     <>
//       {special ? (
//         <>
//           {speciallabel ? (
//             <>
//               <div className="d-flex">
//                 <label
//                   className="form-label me-2 pt-1 text-dark"
//                   style={{ fontSize: "16px" }}
//                 >
//                   {label}
//                 </label>
//                 {readonly ? (
//                   <div className="mb-3">
//                     <FastField
//                       disabled
//                       value={value}
//                       className="form-control"
//                       name={name}
//                       id={name}
//                       type={type}
//                     />

//                     <ErrorMessage
//                       name={name}
//                       className="text-danger"
//                       component="div"
//                     />
//                   </div>
//                 ) : (
//                   <div className="">
//                     <FastField
//                       className="form-control"
//                       name={name}
//                       id={name}
//                       type={type}
//                     />
//                     <ErrorMessage
//                       name={name}
//                       className="text-danger"
//                       component="div"
//                     />
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="d-flex">
//                 <label className="form-label me-2 pt-1 text-dark" style={style}>
//                   {label}
//                 </label>
//                 {readonly ? (
//                   <div className="mb-3">
//                     <FastField
//                       readOnly
//                       value={value}
//                       className="form-control"
//                       name={name}
//                       id={name}
//                       type={type}
//                     />

//                     <ErrorMessage
//                       name={name}
//                       className="text-danger"
//                       component="div"
//                     />
//                   </div>
//                 ) : (
//                   <div className="">
//                     <FastField
//                       className="form-control"
//                       name={name}
//                       id={name}
//                       type={type}
//                     />
//                     <ErrorMessage
//                       name={name}
//                       className="text-danger"
//                       component="div"
//                     />
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <div>
//             {required ? (
//               <label className="form-label text-dark" style={style}>
//                 {label}
//                 <span className="text-danger ms-1">*</span>
//               </label>
//             ) : (
//               <label className="form-control">
//                 {label}
//                 <span className="text-muted">(optional)</span>
//               </label>
//             )}
//             {readonly ? (
//               <div className="mb-3">
//                 <FastField
//                   readOnly
//                   value={value}
//                   className="form-control"
//                   name={name}
//                   id={name}
//                   type={type}
//                 />
//                 <ErrorMessage
//                   name={name}
//                   className="text-danger"
//                   component="div"
//                 />
//               </div>
//             ) : (
//               <div className="">
//                 <FastField
//                   className="form-control"
//                   name={name}
//                   id={name}
//                   type={type}
//                 />
//                 <ErrorMessage
//                   name={name}
//                   className="text-danger"
//                   component="div"
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </>
//   );
// };
