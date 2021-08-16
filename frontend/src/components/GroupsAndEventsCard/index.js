const Card = ({group}) => {
    console.log('group', group.group, group.img)
    return (
        <div>
            <div>
                <img src={group.img} alt="group"></img>
            </div>
            <div>
                <h2>{group.name}</h2>
                <h3>{group.location}</h3>
                <p>{group.description}</p>
            </div>
        </div>
    )

}

export default Card
