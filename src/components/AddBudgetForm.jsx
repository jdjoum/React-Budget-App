import React, { useEffect, useRef } from 'react'

// RRD Imports
import { Form, useFetcher } from "react-router-dom"

// Library Imports
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])
    return (
        <div className='form-wrapper'>
            <h2 className='h3'>
                Create Budget
            </h2>
            <fetcher.Form method='post' className='grid-sm' ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newBudget">Budget Name</label>
                    <input type="text" name='newBudget' id="newBudget" placeholder="ex. Groceries" required ref={focusRef}/>
                </div>
                <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Amount</label>
                <input type="number" step="0.01" name="newBudgetAmount" id="newBudgetAmount" placeholder='ex. $7' required inputMode='decimal'/>
                </div>
                <input type="hidden" name='_action' value="createBudget"/>
                <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
                    {
                        isSubmitting ? <span>Submitting...</span> : (
                            <>
                                <span>Create budget</span>
                                <CurrencyDollarIcon width={20} />
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}

export default AddBudgetForm