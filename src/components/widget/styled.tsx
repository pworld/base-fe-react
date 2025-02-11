import styled from '@emotion/styled';

export const WidgetCardStyled = styled.div`
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    gap: 10px; 
    flex-wrap: wrap;
    .ant-card {
			width: 300px;
			cursor: pointer;
			height: 3.5rem;
			transition: transform 0.3s ease;
    }

		.ant-card:hover {
			transform: scale(1.03);
		}

    .ant-card-body {
			padding: 24px;
			display: inline-flex;
			justify-content: space-between;
			height: 100%;
			width: 100%;
			padding: 18px;
			box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.04)
    }

    p {
				align-self: center;
				display: flex;
				justify-content: start;
				width: 100%;
				font-weight: 600;
				font-size: 14px;
    }

		p:last-child {
			justify-content: end;
		}
`;
