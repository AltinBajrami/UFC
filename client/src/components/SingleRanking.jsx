import React from 'react'
import { Link, Form } from 'react-router-dom'

const SingleRanking = ({ rank, user }) => {
    return (
        <>
            <div className="weightClass">{rank.weightClass.className}</div>
            <div className="champion">
                <Link to={`/fighter/${rank.champion._id}`}> {rank.champion ? ` ${rank.champion.fighterName}` : "N/A"}</Link>
                <span
                    className="champion-span"
                >
                    Champion
                </span>
                {rank.champion.image1 ? (
                    <img
                        src={`http://localhost:5000${rank.champion.image1}`}
                        alt="Champion"
                        width="250"
                    />
                ) : (
                    <img
                        src="http://localhost:5000/uploads/fighters/no-profile-image.png"
                        alt="Champion"
                    />
                )}
            </div>
            {/* Loop through all ranks */}
            {[...Array(10).keys()].map((i) => (
                <div className="athleteRows" key={i}>
                    {rank[`rank${i + 1}`] ? (
                        <>
                            <span>{i + 1} </span>
                            <Link to={`/fighter/${rank[`rank${i + 1}`]._id}`}>{rank[`rank${i + 1}`].fighterName}</Link>
                        </>
                    ) : (
                        `N/A`
                    )}
                </div>
            ))}
            {user && user.role === 'admin' && (
                <div className="actions">
                    <Link to={`/ranked/update/${rank._id}`}>Edit</Link>
                    <Form method='post' action={`/rankings/${rank._id}`}>
                        <button type='submit' className='btn delete-btn'>Delete</button>
                    </Form>
                </div>
            )}
        </>
    )
}

export default SingleRanking