import React, {
   ChangeEvent,
   DetailedHTMLProps,
   InputHTMLAttributes,
} from 'react';
import s from './SuperCheckbox.module.css';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
   InputHTMLAttributes<HTMLInputElement>,
   HTMLInputElement
>;

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
   onChangeChecked?: (checked: boolean) => void;
   spanClassName?: string;
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
   onChange,
   onChangeChecked,
   className,
   spanClassName,
   children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
   id,

   ...restProps // все остальные пропсы попадут в объект restProps
}) => {
   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChangeChecked) {
         onChangeChecked(e.target.checked); // Если передан onChangeChecked, используем его
      }
      if (onChange) {
         onChange(e); // Если передан стандартный onChange, используем его
      }
   };
   //    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
   //       onChangeChecked?.(e.currentTarget.checked);
   //    };

   const finalInputClassName = s.checkbox + (className ? ' ' + className : '');

   return (
      <label className={s.label}>
         <input
            id={id}
            type={'checkbox'}
            onChange={handleChange}
            className={finalInputClassName}
            {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
         />
         {children && (
            <span
               id={id ? id + '-span' : undefined}
               className={s.spanClassName}>
               {children}
            </span>
         )}
      </label> // благодаря label нажатие на спан передастся в инпут
   );
};

export default SuperCheckbox;
