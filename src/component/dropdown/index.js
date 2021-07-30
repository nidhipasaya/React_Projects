import React, { useRef, useState, useEffect } from 'react';
import "./styles.css"

export default function Dropdown(
    { options,
        prompt,
        id,
        name,
        value,
        onChange }) {

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("")
    const ref = useRef(null);

    useEffect(() => {
        ["click", "touchend"].forEach(e => {
            document.addEventListener(e, toggle);
        })

        return () => ["click", "touchend"].forEach(e => {
            document.removeEventListener(e, toggle)
        })

    }, [])

    function toggle(e) {
        setOpen(e && e.target === ref.current);
      
    }

    function filter(options) {
        return options.filter(
            (option) =>
                option[name].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
    }
    function displayValue() {
        if (query.length > 0) return query
        if (value) return value[name]
        return "";
    }
    function selectOption(option) {
        setQuery("")
        onChange(option)
        setOpen(false)
    }

    return <div className="dropdown">
        <div className="control">
            <div className="selected-value" >
                <input type="text"
                    ref={ref}
                    placeholder={value ? value[name] : prompt}
                    value={displayValue()}
                    name="name"
                    onChange={(e) => {
                        try{
                            setQuery(e.target.value)
                            onChange(null)
                        }
                        catch(e){
                            console.log("Data is not present DropdownList")
                        }
                        
                    }}
                    onClick={toggle}
                    onTouchEnd ={toggle}
                />
            </div>
            <div className={`arrow ${open ? "open" : null}`} />
        </div>
        <div className={`options ${open ? "open" : null}`} >
            {
                filter(options).map((option) => (
                    <div 
                    key={option[id]} 
                    className={`option ${
                        value === option ? "selected" : null
                    }`}
                    onClick={() => selectOption(option)} 
                    onTouchEnd={() => selectOption(option)}>{option[name]}</div>
                ))
            }
        </div>

    </div>
}