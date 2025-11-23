import chatData from "@/mock/chat";
import Image from "next/image";
import { FaPhoneFlip, FaVideo } from "react-icons/fa6";
import { IoSendSharp } from "react-icons/io5";

const MessageInbox = () => {
  const fullMessage =
    "Happy birthday to you!! You’ve brought so much happiness into my life, and I hope today brings you just as much as you give the world every single day. Happy birthday! blah blah blah...";

  return (
    <div id="chat" className="flex flex-col gap-0 w-full h-[100dvh] relative">
      <Image
        src="/images/chatbg.jpg"
        alt="Logo"
        width={390}
        height={844}
        className="absolute w-full object-cover top-0 left-0 -z-10"
      />
      {/* Top Bar */}
      <div className="flex justify-between items-center gap-3 p-2 bg-[#161f43] rounded">
        <div className="flex items-center gap-2">
          <img
            src="/images/user.jpg"
            alt="User"
            className="w-[30px] h-[30px] rounded-full object-cover"
          />
          <p className="text-white">❤️TRUE+😊CuTe fRienD.</p>
        </div>
        <div className="flex gap-2">
          <FaPhoneFlip />
          <FaVideo />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-full w-full overflow-auto flex flex-col gap-[15px] shrink pb-4">
        {chatData.map(({ message, user }, i) => (
          <>
            {user === "me" ? (
              <div
                key={i}
                className="flex items-center justify-end w-full pr-2"
              >
                <p className="max-w-[250px] py-2 px-3 bg-[#3d61d4] text-white rounded-[17px] text-sm">
                  {message}
                </p>
              </div>
            ) : (
              <div key={i} className="flex items-end gap-2 pl-2">
                <img
                  src="/images/user.jpg"
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  alt="User"
                />
                <p className="max-w-[250px] py-2 px-3 bg-[#25252b] text-white rounded-[17px] text-sm">
                  {message}
                </p>
              </div>
            )}
          </>
        ))}
      </div>

      {/* Bottom Chatbox */}
      <div className="h-fit shrink-0">
        <div className="flex gap-2 bg-[#070d27] p-3 rounded items-end">
          <div className="flex-grow bg-[#161f43] p-3 rounded-[10px] text-sm">
            <p className="overflow-hidden">
              {fullMessage.split("").map((char, i) => (
                <span key={char + i} className="input-char hidden">
                  {char}
                </span>
              ))}
            </p>
          </div>
          <IoSendSharp className="shrink-0" />
        </div>
        <img src="/images/keyboard.jpg" className="" />
      </div>
    </div>
  );
};

export default MessageInbox;
