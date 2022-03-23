import React from 'react';
import './styles.scss';

const Box = (props: {name: string, value: string, description: string}) => {
    return (
        <div className="box-container r-mrg">
            <div className="info">
                <span className="name">{props.name}</span>
                <div className="price">
                    <span className="currency">R$</span>
                    <span className="value">{parseFloat(props.value).toFixed(2)}</span>
                </div>
                <span className="description">{props.description}</span>
            </div>
            <div className="icon">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_454_10)">
                        <path
                            d="M7.27273 0.242188C6.66909 0.242188 6.18182 0.72946 6.18182 1.3331V3.87855H5.09091C4.48727 3.87855 4 4.36582 4 4.96946C4 5.5731 4.48727 6.06037 5.09091 6.06037H6.18182V18.424H5.09091C4.48727 18.424 4 18.9113 4 19.5149C4 20.1186 4.48727 20.6058 5.09091 20.6058H6.18182V23.1513C6.18182 23.7549 6.66909 24.2422 7.27273 24.2422C7.87636 24.2422 8.36364 23.7549 8.36364 23.1513V20.6058H11.2727V23.1513C11.2727 23.7549 11.76 24.2422 12.3636 24.2422C12.9673 24.2422 13.4545 23.7549 13.4545 23.1513V20.6058H15.2727C17.88 20.6058 20 18.4858 20 15.8786C20 13.8313 18.6911 12.0928 16.8693 11.4347C17.462 10.6456 17.8182 9.66764 17.8182 8.60582C17.8182 6.12219 15.8909 4.08247 13.4545 3.89702V1.3331C13.4545 0.72946 12.9673 0.242188 12.3636 0.242188C11.76 0.242188 11.2727 0.72946 11.2727 1.3331V3.87855H8.36364V1.3331C8.36364 0.72946 7.87636 0.242188 7.27273 0.242188ZM8.36364 6.06037H13.0909C14.4945 6.06037 15.6364 7.20219 15.6364 8.60582C15.6364 10.0095 14.4945 11.1513 13.0909 11.1513H8.36364V6.06037ZM8.36364 13.3331H13.0909H15.2727C16.6764 13.3331 17.8182 14.4749 17.8182 15.8786C17.8182 17.2822 16.6764 18.424 15.2727 18.424H8.36364V13.3331Z"
                            fill="black"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_454_10">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default Box;
