import React from 'react'
import classes from './MealsSummary.module.css'

const MealsSummary = () => {
    return (
        <section className={classes.summary} >
            <h2>Delicious Food, Delivered to you</h2>
            <p>Order now to get the ultimate taste experience!</p>
            <p>For orders grater than 100$ the delivery fees are free</p>
        </section>
    )
}

export default MealsSummary
