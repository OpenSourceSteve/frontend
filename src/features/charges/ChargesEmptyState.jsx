import { forwardRef } from 'react'

import resourceStyles from '../../features/resourceStyles.module.css'

export const ChargesEmptyState = ({ openDialog }) => (
    <div className={resourceStyles.fullpage}>
        <div className={resourceStyles.secondary}>
            <h2>Your client does not have any charges yet.</h2>
            <p>Would you like to add a new one?</p>
            <button onClick={openDialog}>Add New Charge</button>
        </div>
    </div>
)