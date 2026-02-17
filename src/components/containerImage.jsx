const ContainerImage = ({ content, img, alt }) => {
    return (
        <div className="container-image">
            <img src={img} alt={alt} />
            <p>{content}</p>
        </div>
    );
};

export default ContainerImage;