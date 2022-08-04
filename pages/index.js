import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {toast} from "react-toastify";
import toastConfig from "../config/toast.config";
import axios from "axios";
import validator from "validator/es";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Home = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState('');

    const __refresh__ = () => {
        setUrl('');
        setResult('');
    }

    const handleGetShortURL = async (e) => {
        e.preventDefault();
        if(url === "") {
            toast.error("Enter URL", toastConfig());
        } else {
            if(validator.isURL(url)) {
               const {data: shortenedURLData} = await axios.get(`
                https://api.shrtco.de/v2/shorten?url=${url}
                `);

                if(shortenedURLData.result.full_short_link2 !== undefined) {
                    setResult(shortenedURLData.result.full_short_link2);
                } else {
                    toast.error("Error happened", toastConfig());
                    console.warn(shortenedURLData);
                }
            } else {
                toast.error("Please enter valid URL", toastConfig());
            }
        }
    }

    const handleClickToClipboard = () => {
        toast.success("Copied to clipboard", toastConfig());
        __refresh__();
    }

    return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
        <div className={"border rounded bg-light w-25 p-4"} style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <div className={"fs-4 text-center"}>
               URL Shortener
            </div>
            <Form onSubmit={handleGetShortURL} style={{
                display: "flex"
            }}>
                <Form.Control style={{
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    borderRight: "0"
                }}  placeholder={"Enter URL"} aria-autocomplete={"none"} value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button style={{
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                    borderLeft: "0"
                }} type={"submit"}>
                    Submit
                </Button>
            </Form>
            <div className={"text-center text-success fw-bold"}>
                {result}
                {' '}
                {result !== "" ? (
                    <CopyToClipboard text={result} onCopy={handleClickToClipboard}>
                        <Button variant={"secondary"} className={"opacity-50 p-0 ps-2 pe-2 pt-1 pb-1"} title={"Copy to clipboard"}>
                            <i className="fa-solid fa-clipboard"></i>
                        </Button>
                    </CopyToClipboard>
                ) : (<></>)}
            </div>
        </div>
    </div>
  )
}

export default Home;
