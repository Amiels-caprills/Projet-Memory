const ContainerHeader = ({ content, img, alt }) => {
    return (
        <div className="container-header">
            <img src={img} alt={alt} />
            <p>{content}</p>
        </div>
    );
};

export default ContainerHeader;