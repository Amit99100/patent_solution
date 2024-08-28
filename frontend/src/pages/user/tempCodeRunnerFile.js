  <div className="card">
                <div className="card-header">
                    <h4>My Questions</h4>
                </div>
                <div className="card-body">
                    {myQuestions.length === 0 ? (
                        <p>No questions asked yet.</p>
                    ) : (
                        <ul className="list-group">
                            {myQuestions.map(question => (
                                <li key={question._id} className="list-group-item">
                                    <h5>{question.questionTitle}</h5>
                                    <p>{question.questionDetails}</p>
                                    {question.answer && (
                                        <div>
                                            <h6><b>Answer:</b></h6>
                                            <p>{question.answer}</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>