"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { IconSend, IconPaperclip, IconCheck } from "@tabler/icons-react";
import { assetPathProvider } from "@/config/asset_path_provider";

interface Message {
  sender: "bot" | "user";
  text: string;
  isImage?: boolean;
}

type StepType = "options" | "checkbox" | "autocomplete" | "attachment";

interface ChatStep {
  botMessage: string;
  type: StepType;
  options?: string[];
  autoValue?: string;
}

const CHAT_STEPS: ChatStep[] = [
  {
    botMessage: "안녕하세요! 홍길동님 세이프버디입니다 👋\n신규채용자 관리대장을 작성해볼까요?",
    type: "options",
    options: ["네, 시작할게요!"],
  },
  {
    botMessage: "직종 및 건설장비를 선택해주세요.",
    type: "options",
    options: ["건설기계 운전", "비계공", "철근공"],
  },
  {
    botMessage: "안전보호구 지급현황을 선택해주세요.\n해당 항목을 모두 체크 후 확인을 눌러주세요.",
    type: "checkbox",
    options: ["안전모", "안전화", "안전대", "보호장갑", "보안경"],
  },
  {
    botMessage: "혈액형 정보를 알려주세요.",
    type: "options",
    options: ["A형", "B형", "O형", "AB형"],
  },
  {
    botMessage: "비상연락망을 입력해주세요.",
    type: "autocomplete",
    autoValue: "010-*990-1019",
  },
  {
    botMessage: "기초안전보건교육증을 첨부해주세요.",
    type: "attachment",
  },
];

const FINAL_BOT_MESSAGE =
  "모든 항목이 입력되었습니다! ✅\n관리자 페이지에서 확인해보세요.";

const ANSWER_KEYS = [
  "start",
  "jobType",
  "safetyGear",
  "bloodType",
  "emergencyContact",
  "trainingCert",
];

interface PhoneMockupProps {
  onComplete: (answers: Record<string, string>) => void;
}

const PhoneMockup = ({ onComplete }: PhoneMockupProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [customInputMode, setCustomInputMode] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // checkbox state
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // autocomplete state
  const [autoText, setAutoText] = useState("");
  const [autoCompleted, setAutoCompleted] = useState(false);

  // attachment state
  const [attached, setAttached] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const answersRef = useRef<Record<string, string>>({});

  const scrollToBottom = useCallback(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, []);

  const addBotMessage = useCallback(
    (text: string, callback?: () => void) => {
      setIsTyping(true);
      setShowOptions(false);
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text }]);
        setIsTyping(false);
        setTimeout(() => {
          scrollToBottom();
          callback?.();
        }, 100);
      }, 800);
    },
    [scrollToBottom]
  );

  // 첫 메시지
  useEffect(() => {
    addBotMessage(CHAT_STEPS[0].botMessage, () => {
      setShowOptions(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showOptions, checkedItems, autoText, attached, scrollToBottom]);

  const advanceToNextStep = useCallback(
    (answer: string) => {
      answersRef.current[ANSWER_KEYS[currentStep]] = answer;
      const nextStep = currentStep + 1;

      if (nextStep < CHAT_STEPS.length) {
        setCurrentStep(nextStep);
        // reset per-step state
        setCheckedItems([]);
        setAutoText("");
        setAutoCompleted(false);
        setAttached(false);
        setCustomInputMode(false);
        setCustomInput("");

        addBotMessage(CHAT_STEPS[nextStep].botMessage, () => {
          setShowOptions(true);
          // auto-fill for autocomplete step
          if (CHAT_STEPS[nextStep].type === "autocomplete") {
            const fullValue = CHAT_STEPS[nextStep].autoValue || "";
            let idx = 0;
            const timer = setInterval(() => {
              idx++;
              setAutoText(fullValue.slice(0, idx));
              if (idx >= fullValue.length) {
                clearInterval(timer);
                setAutoCompleted(true);
              }
            }, 60);
          }
        });
      } else {
        setIsCompleted(true);
        addBotMessage(FINAL_BOT_MESSAGE, () => {
          setTimeout(() => {
            onComplete(answersRef.current);
          }, 1000);
        });
      }
    },
    [currentStep, addBotMessage, onComplete]
  );

  const handleOptionSelect = (option: string) => {
    if (isCompleted) return;
    setMessages((prev) => [...prev, { sender: "user", text: option }]);
    setShowOptions(false);
    advanceToNextStep(option);
  };

  const handleCustomSubmit = () => {
    if (customInput.trim()) {
      handleOptionSelect(customInput.trim());
      setCustomInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  const handleCheckboxConfirm = () => {
    if (checkedItems.length === 0) return;
    const answer = checkedItems.join(", ");
    setMessages((prev) => [...prev, { sender: "user", text: answer }]);
    setShowOptions(false);
    advanceToNextStep(answer);
  };

  const handleAutoConfirm = () => {
    const value = CHAT_STEPS[currentStep].autoValue || "";
    setMessages((prev) => [...prev, { sender: "user", text: value }]);
    setShowOptions(false);
    advanceToNextStep(value);
  };

  const handleAttach = () => {
    setAttached(true);
  };

  const handleAttachConfirm = () => {
    const answer = "이수증 첨부완료";
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: "📎 기초안전보건교육 이수증.jpg", isImage: true },
    ]);
    setShowOptions(false);
    advanceToNextStep(answer);
  };

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const currentStepData =
    currentStep < CHAT_STEPS.length ? CHAT_STEPS[currentStep] : null;

  return (
    <div className="relative mx-auto w-[280px] md:w-[320px]">
      {/* Phone Frame */}
      <div className="rounded-[40px] border-[6px] border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="relative bg-gray-800 h-7 flex items-center justify-center">
          <div className="w-20 h-5 bg-gray-900 rounded-b-2xl" />
        </div>

        {/* Status Bar */}
        <div className="bg-white px-5 py-1.5 flex items-center justify-between text-[10px] text-gray-500 font-medium">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-2 border border-gray-400 rounded-sm relative">
              <div className="absolute inset-0.5 bg-gray-500 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Chat Header */}
        <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-mint-100 flex-shrink-0">
            <img
              src={assetPathProvider.image.seiimBot}
              alt="세이프버디"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900">세이프버디</p>
            <p className="text-[10px] text-mint-600">온라인</p>
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="h-[340px] md:h-[380px] overflow-y-auto bg-gray-50 px-3 py-3 space-y-2.5 scrollbar-none"
          style={{
            backgroundImage: `url(${assetPathProvider.image.chatBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && (
                <div className="w-6 h-6 rounded-full overflow-hidden bg-mint-100 flex-shrink-0 mr-1.5 mt-0.5">
                  <img
                    src={assetPathProvider.image.seiimBot}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`max-w-[75%] px-3 py-2 text-[12px] leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-mint-500 text-white rounded-2xl rounded-tr-md"
                    : "bg-white text-gray-800 rounded-2xl rounded-tl-md shadow-sm"
                }`}
              >
                {msg.isImage ? (
                  <div className="flex items-center gap-1.5">
                    <IconPaperclip size={12} />
                    <span>{msg.text}</span>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-mint-100 flex-shrink-0 mr-1.5 mt-0.5">
                <img
                  src={assetPathProvider.image.seiimBot}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-md shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* Interactive Area */}
          {showOptions && !isCompleted && currentStepData && (
            <div className="pl-8 pt-1 space-y-2">
              {/* === Options type === */}
              {currentStepData.type === "options" && (
                <div className="flex flex-wrap gap-1.5">
                  {currentStepData.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(opt)}
                      className="px-3 py-1.5 bg-white border border-mint-400 text-mint-700 text-[11px] font-medium rounded-full hover:bg-mint-50 transition-colors shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                  {/* 직접 입력 button (step 1 only — 직종 선택) */}
                  {currentStep === 1 && (
                    <button
                      onClick={() => setCustomInputMode(true)}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 text-[11px] font-medium rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      직접 입력
                    </button>
                  )}
                </div>
              )}

              {/* === Checkbox type === */}
              {currentStepData.type === "checkbox" && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2.5 space-y-1">
                  {currentStepData.options?.map((item) => {
                    const isChecked = checkedItems.includes(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleCheck(item)}
                        className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                          isChecked
                            ? "bg-mint-50 text-mint-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                            isChecked
                              ? "bg-mint-500 border-mint-500"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isChecked && <IconCheck size={10} className="text-white" />}
                        </div>
                        {item}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleCheckboxConfirm}
                    disabled={checkedItems.length === 0}
                    className="w-full mt-1 py-1.5 bg-mint-500 text-white text-[11px] font-semibold rounded-lg hover:bg-mint-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    확인 ({checkedItems.length}개 선택)
                  </button>
                </div>
              )}

              {/* === Autocomplete type === */}
              {currentStepData.type === "autocomplete" && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2.5">
                  <p className="text-[10px] text-gray-400 mb-1.5">기존 입력내용 자동완성</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-[12px] text-gray-800 font-medium">
                      {autoText}
                      {!autoCompleted && (
                        <span className="inline-block w-0.5 h-3.5 bg-mint-500 ml-0.5 animate-pulse align-middle" />
                      )}
                    </div>
                    {autoCompleted && (
                      <button
                        onClick={handleAutoConfirm}
                        className="px-3 py-1.5 bg-mint-500 text-white text-[11px] font-semibold rounded-lg hover:bg-mint-600 transition-colors flex-shrink-0"
                      >
                        확인
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* === Attachment type === */}
              {currentStepData.type === "attachment" && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2.5">
                  {!attached ? (
                    <button
                      onClick={handleAttach}
                      className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-mint-400 hover:text-mint-600 transition-colors"
                    >
                      <IconPaperclip size={14} />
                      <span className="text-[11px] font-medium">이수증 첨부</span>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 px-2.5 py-2 bg-mint-50 rounded-lg border border-mint-200">
                        <div className="w-10 h-10 rounded-md bg-mint-100 flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b7af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium text-gray-800 truncate">
                            기초안전보건교육 이수증.jpg
                          </p>
                          <p className="text-[9px] text-mint-600">첨부완료</p>
                        </div>
                        <IconCheck size={16} className="text-mint-500 flex-shrink-0" />
                      </div>
                      <button
                        onClick={handleAttachConfirm}
                        className="w-full py-1.5 bg-mint-500 text-white text-[11px] font-semibold rounded-lg hover:bg-mint-600 transition-colors"
                      >
                        확인
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center gap-2">
          <input
            type="text"
            placeholder={customInputMode ? "직접 입력해주세요..." : "메시지를 입력하세요"}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!customInputMode}
            className="flex-1 text-[12px] px-3 py-2 bg-gray-50 rounded-full border border-gray-200 outline-none focus:border-mint-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 placeholder:text-gray-400"
          />
          <button
            onClick={handleCustomSubmit}
            disabled={!customInputMode || !customInput.trim()}
            className="w-8 h-8 rounded-full bg-mint-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-mint-600 transition-colors flex-shrink-0"
          >
            <IconSend size={14} />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="bg-white h-4 flex items-center justify-center">
          <div className="w-24 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
