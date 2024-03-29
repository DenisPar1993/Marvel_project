import { useState,useEffect } from "react";
import { Formik, Form, ErrorMessage as FormikErrorMessage  ,Field } from "formik";
import { Link } from "react-router-dom";
import './charForm.scss';
import * as Yup from 'yup';
import useMarvelService from "../services/MarvelService";


const CharForm =()=>{
    const [char, setChar]=useState(null);
    const {getNameChar,clearError,process, setProcess}=useMarvelService();
    const onUpdateChar = (name) => {
            clearError();
            getNameChar(name)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onCharListLoaded =(char)=>{
      setChar(char);
    }

    const result= !char?null:char.length>0?
    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div>:
                     <div className="char__search-error">
                     The character was not found. Check the name and try again
                 </div>;


    return(
        <div className="char__search-form">
            <Formik
            initialValues={{charName:''}}
            validationSchema={Yup.object({
               charName:Yup.string()
                        .required('Not found')
            })}
            onSubmit ={({charName})=>{
                onUpdateChar(charName)
            }}
            >
            <Form >
                <label className="char__search-label" htmlFor="#">Персонаж</label>
                
                <Field 
                id="charName"
                name="charName"
                type="text"/>
                
                <button 
                            type='submit' 
                            className="button button__main"
                            disabled={process==='loading'}>
                            <div className="inner">find</div>
                </button>
                
                <FormikErrorMessage component="div" className="char__search-error" name="charName" />
               

            </Form>
            </Formik>
            {result}
        </div>
    )
}
export default CharForm