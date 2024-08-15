import httpx


class p_klikk:
    """
    Source: https://www.klikk.tv/
    """

    def __init__(self):
        self.name = "klikk"
        self.url = "https://www.klikk.tv/"

    def send(self, phone: str):
        url = "https://www.klikk.tv/?r=user/GetOtp"
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Referer": "https://www.klikk.tv/",
            "Origin": "https://www.klikk.tv",
            "API-KEY": "f4f068e71e0d87bf0ad51e6214ab84e9",
        }
        payload = {"mobileNumber": "91-" + phone}

        try:
            response = httpx.post(url, headers=headers, json=payload, timeout=30.0)
            if response.status_code == 200 and response.json()["result"] == True:
                return 1
            else:
                return 0
        except:
            return -1
