const BoxChat = ({oldDatas, UserID}) => {
    return(
        <>
            {oldDatas?.map((item, index)=>{
                            return(
                              <div className="px-11 simplebar">
                                <div key={index}>
                                {item.SenderID==UserID?
                                  <div className="chat chat-end">
                                    <div className="chat-bubble chat-bubble-success">{item.Content}</div>
                                  </div>
                                :
                                  <div className="chat chat-start">
                                      <div className="chat-bubble">{item.Content}</div>
                                  </div>}
                                </div>
                              </div>
                            )
                          }).reverse()}
        </>
    )
}
export default BoxChat