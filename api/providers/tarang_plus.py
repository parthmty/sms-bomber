import httpx


class p_tarang_plus:
    """
    Source: https://www.tarangplus.in/
    """

    def __init__(self):
        self.name = "tarang_plus"
        self.url = "https://www.tarangplus.in/"

    def send(self, phone: str):
        url = "https://tarangplus.in/users/sign_up"

        payload = {
            "name": "SMB",
            "mobile_no": phone,
            "type": "phone",
            "password": "Natsu11...",
        }
        headers = {
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.tarangplus.in/",
            "Origin": "https://www.tarangplus.in",
            "Alt-Used": "www.tarangplus.in",
        }

        try:
            response = httpx.post(url, headers=headers, data=payload, timeout=30.0)
            if (
                response.status_code == 200
                and response.json()["status"] == True
                and response.json()["error_message"] == ""
            ):
                return 1
            else:
                return 0
        except:
            return -1
