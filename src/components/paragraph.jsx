const Paragraph = ({ content, image }) => {
    return (
        <div>
            <p>{content}</p>
            {image && <img src={image} alt="image" />}
        </div>
    );
};

export default Paragraph;