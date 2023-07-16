import { Button, Col, Dropdown, Layout, Menu, Row, Upload } from 'antd';
import { MdOutlineEventNote, MdOutlineFileUpload, MdLink, MdKeyboardArrowDown, MdAccountCircle } from 'react-icons/md';
import CheckBoxAll from '../../components/CheckBoxAll';
import CheckBoxMenu from '../../components/CheckBoxMenu';
import iconYT from '../../img/youtube.png';
import iconGGD from '../../img/google-drive.png';
import HeaderToken from '../../common/utils/headerToken';
import axios from 'axios';
import SystemConst from '../../common/consts/system_const';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Notification from '../../components/Notification';
const { Header, Content, Footer } = Layout;
const BASE_URL = `${SystemConst.DOMAIN}`;
const PopupCreateExercise = ({ visible, onFetchData }: { visible: any; onFetchData: any }) => {
    const handleMenuListStudentChange = (selectedOptions: number[], selectAll: boolean) => {
        console.log(selectedOptions, selectAll);
    };
    const ListStudent = [
        { id: 1, label: 'Nguyễn Văn A', icon: <MdAccountCircle size={32} /> },
        { id: 2, label: 'Nguyễn Văn B', icon: <MdAccountCircle size={32} /> },
        { id: 3, label: 'Nguyễn Văn C', icon: <MdAccountCircle size={32} /> },
    ];
    const [valueTitle, setValueTitle] = useState('');
    const [valueContent, setValueContent] = useState('');
    const [selectedFile, setSelectedFile] = useState<any[]>([]);
    const [listStudent, setListStudent] = useState<any>([]);
    const [isPublic, setIsPublic] = useState(true);
    const { classroom_id } = useParams();
    useEffect(() => {
        handleFetchStudentList();
    }, []);
    const handleFetchStudentList = () => {
        const config = HeaderToken.getTokenConfig();
        axios.get(`${SystemConst.DOMAIN}/${classroom_id}/get-list-student-classroom`, config).then((response) => {
            const studentList = response.data.response_data;
            setListStudent(studentList);
        });
    };
    const handleFetchUploadFile = () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        if (classroom_id) {
            const parser = new DOMParser();
            const parsedTitle = parser.parseFromString(valueTitle, 'text/html');
            const parsedContent = parser.parseFromString(valueContent, 'text/html');
            const plainTextContent = parsedContent.body.textContent || '';
            const plainTextTitle = parsedTitle.body.textContent || '';
            const parsedClassroomId = parseInt(classroom_id, 10); // Chuyển đổi thành số nguyên (integer)
            const parsedPostCategoryId = parseInt('3', 10);
            const formData = new FormData();
            formData.append('classroom_id', parsedClassroomId.toString());
            formData.append('content', plainTextContent);
            formData.append('title', plainTextTitle);
            formData.append('post_category_id', parsedPostCategoryId.toString());
            selectedFile.forEach((files) => {
                formData.append(`files`, files);
            });
            axios
                .post(`${BASE_URL}/posts/create-post`, formData, config)
                .then((response) => {
                    console.log(response);
                    setValueContent('');
                    setValueTitle('');
                    setSelectedFile([]);
                    visible();
                    onFetchData();
                    Notification('success', 'Thông báo', 'Tạo thành công bảng tin');
                })
                .finally(() => {});
            console.log(formData);
        }
    };
    const handleFileUpload = (file: any) => {
        setSelectedFile((prevSelectedFiles) => [...prevSelectedFiles, file]);
        console.log(file);
    };
    const handleRemoveFile = (file: any) => {
        setSelectedFile((prevSelectedFile) => prevSelectedFile.filter((f) => f.uid !== file.uid));
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleFetchUploadFile();
    };
    const handleChangeTextAreaTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueTitle(e.target.value);
    };
    const handleChangeTextAreaContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueContent(e.target.value);
    };
    const handleButtonCancel = () => {
        setValueContent('');
        setValueTitle('');
        setSelectedFile([]);
        visible();
    };
    return (
        <>
            <Layout>
                <form action="" onSubmit={handleSubmit}>
                    <Header className="bg-blue-400 h-16 flex items-center justify-between">
                        <div className="">
                            <div className="ml-10 text-xl text-gray-200 font-sans flex items-center gap-x-3">
                                <div className="bg-blue-400 text-indigo-500 text-2xl p-1 rounded-2xl">
                                    <MdOutlineEventNote></MdOutlineEventNote>
                                </div>
                                <div> Bài Tập</div>
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <div className="flex justify-between">
                            <div className="border-slate-300 border-r-2 w-full h-full  p-10">
                                <div className="mb-5 ">
                                    <div className="relative mb-3 mt-2 px-2" data-te-input-wrapper-init>
                                        <textarea
                                            value={valueTitle}
                                            onChange={handleChangeTextAreaTitle}
                                            className="bg-slate-100 h-14 peer block min-h-[auto] w-full rounded-sm border-b-2 border-indigo-400 focus:border-b-[3.5px]  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-100 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlTextarea1"
                                            placeholder="Your message"
                                            style={{ resize: 'none' }}
                                        ></textarea>
                                        <label
                                            htmlFor="exampleFormControlTextarea1"
                                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                        >
                                            Tiêu Đề
                                        </label>
                                    </div>
                                </div>
                                <div className="relative mb-3 mt-2 px-2" data-te-input-wrapper-init>
                                    <textarea
                                        value={valueContent}
                                        onChange={handleChangeTextAreaContent}
                                        className="h-[50vh] 2xl:max-h-[30vh]  3xl:max-h-[40vh] bg-slate-100 peer block min-h-[auto] w-full rounded-sm border-b-2 border-indigo-400 focus:border-b-[3.5px]  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-100 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="exampleFormControlTextarea1"
                                        placeholder="Hướng dẫn (không bắt buộc)"
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    >
                                        Nội dung
                                    </label>
                                </div>
                                <div className="mt-4 max-h-32 overflow-auto">
                                    <div className="flex items-center justify-between px-3 py-2 overflow-auto">
                                        <Upload
                                            className="flex-grow overflow-auto"
                                            listType="picture"
                                            multiple
                                            showUploadList={{ showRemoveIcon: true }}
                                            accept=".png,.jpeg,.jpg,.pdf,.docx,.doc,.pptx,.xlsx,.rar,.zip"
                                            beforeUpload={(file) => {
                                                handleFileUpload(file);
                                                return false;
                                            }}
                                            fileList={selectedFile}
                                            onRemove={(file) => handleRemoveFile(file)}
                                        >
                                            <Button className="w-full">
                                                <MdOutlineFileUpload />
                                            </Button>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[20%] p-10">
                                <div>
                                    <Dropdown
                                        overlay={
                                            <Menu className="w-full fixed max-h-60 overflow-auto">
                                                <CheckBoxAll
                                                    options={listStudent}
                                                    onChange={handleMenuListStudentChange}
                                                />
                                            </Menu>
                                        }
                                        placement="bottom"
                                        trigger={['click']}
                                        overlayClassName="custom-dropdown-menu"
                                        overlayStyle={{
                                            width: '240px',
                                            height: '250px',
                                            padding: '10px',
                                            gap: '10px',
                                        }}
                                    >
                                        <Button className="gap-x-1">
                                            Dành cho
                                            <span>
                                                <MdKeyboardArrowDown />
                                            </span>
                                        </Button>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </Content>
                    <Footer className="bg-slate-100 p-20">
                        <div className="w-full h-full justify-end flex  gap-x-2">
                            <Button disabled={!valueTitle} htmlType="submit" type="primary">
                                Gửi
                            </Button>
                            <Button onClick={handleButtonCancel} type="primary" danger>
                                Hủy
                            </Button>
                        </div>
                    </Footer>
                </form>
            </Layout>
        </>
    );
};

export default PopupCreateExercise;
