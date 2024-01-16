import React, { useState } from 'react';
import './CoursesList.scss';
import { courses } from '../../../../mocks/courses';
import { Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const ITEMS_PER_PAGE = 3;

export const CoursesList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
	const startIndex = currentPage * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentCourses = courses.slice(startIndex, endIndex);

	const goToPreviousPage = () => {
		setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
	};

	const goToNextPage = () => {
		setCurrentPage((prev) =>
			prev < totalPages - 1 ? prev + 1 : totalPages - 1
		);
	};

	return (
		<div className="courses-container">
			<div className="courses-container__header">
				<Title className="title">соло-курсы</Title>
				<div className="controls">
					{currentPage >= 1 && (
						<Button
							onClick={goToPreviousPage}
							className="pagination-btn prev"
							disabled={currentPage === 0}
						>
							&lt;
						</Button>
					)}

					{currentPage < totalPages - 1 && (
						<Button
							onClick={goToNextPage}
							className="pagination-btn next"
							disabled={currentPage >= totalPages - 1}
						>
							&gt;
						</Button>
					)}
				</div>
			</div>

			<div className="courses-list">
				{currentCourses.map((course) => (
					<div key={course.id} className="courses-list__card">
						<Title className="courses-list__title">{course.title}</Title>
						<Typography className="courses-list__text">
							{course.description}
						</Typography>
						<Button className="courses-list__record-button">записаться</Button>
					</div>
				))}
			</div>
		</div>
	);
};
