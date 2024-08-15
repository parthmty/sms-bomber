import httpx


class p_hungama:
    """
    Source: https://www.hungama.com/
    """

    def __init__(self):
        self.name = "hungama"
        self.url = "https://www.hungama.com/"

    def send(self, phone: str):
        url = "https://www.hungama.com/?c=login&m=sendMobileOTP"
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.hungama.com/",
            "Origin": "https://www.hungama.com",
            "Alt-Used": "www.hungama.com",
        }
        payload = {"c_data": "+91", "p_data": phone}

        try:
            response = httpx.post(url, headers=headers, data=payload, timeout=30.0)
            if response.status_code == 200 and response.json()["message"] == "success":
                return 1
            else:
                return 0
        except:
            return -1
