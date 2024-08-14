import React from 'react'

const MessageBlock = ({message}) => {
    return (
        <div className="">
          <div className="p-4 flex ">
            <img src="/images/tick.png" />
            <p className="ml-1 p-3 text-green-400 text-xl font-bold">{message}</p>
          </div>
        </div>
      );
    };

export default MessageBlock
