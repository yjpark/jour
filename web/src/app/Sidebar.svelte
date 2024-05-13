<script>
    import { getPagePath, redirectPage } from '@nanostores/router'

    import { router } from "@app/router";

    function redirect(name, params, search) {
        const sidebar_drawer = document.getElementById("sidebar-drawer");
        if (sidebar_drawer !== null) {
            sidebar_drawer.checked = false;
        }
        redirectPage(router, name, params, search);
    }
</script>

<!-- Body -->
<div class="flex flex-col border-y border-base-300 px-6 pt-4 grow">
    <!-- Search input -->
    <input class="input input-bordered" placeholder="Search..." />

    <!-- Links -->
    <div class="flex flex-col divide-y divide-base-300">
        <ul class="menu px-0 py-4">
            <li>
                <div onclick={() => redirect("home")}>
                    <i class="fa-solid fa-house fa-fw"></i>
                    Home
                </div>
            </li>
            <li>
                <div onclick={() => redirect("jours")}>
                    <i class="fa-solid fa-users fa-fw"></i>
                    JOURs
                </div>
            </li>
            <li>
                <a class="active">
                    <i class="fa-solid fa-fire fa-fw"></i>
                    Features
                </a>
            </li>
            <li>
                <a>
                    <i class="fa-solid fa-podcast fa-fw"></i>
                    Podcast
                </a>
            </li>
            <li>
                <a>
                    <i class="fa-solid fa-newspaper fa-fw"></i>
                    News
                </a>
            </li>
        </ul>

        <ul class="menu px-0 py-4">
            <li>
                <a>
                    <i class="fa-brands fa-github fa-fw"></i>
                    GitHub
                </a>
            </li>
            <li>
                <a>
                    <i class="fa-brands fa-facebook fa-fw"></i>
                    Facebook
                </a>
            </li>
            <li>
                <a>
                    <i class="fa-brands fa-youtube fa-fw"></i>
                    Youtube
                </a>
            </li>
        </ul>

        <ul class="menu px-0 py-4">
            <li>
                <a>
                    <i class="fa-solid fa-truck fa-fw"></i>
                    Deliver
                </a>
            </li>
            <li>
                <a>
                    <i class="fa-solid fa-box fa-fw"></i>
                    Products
                </a>
            </li>
            <li>
                <a>
                    <i class="fa-solid fa-store fa-fw"></i>
                    Store
                </a>
            </li>
            <li>
                <a>
                    <i class="fa-solid fa-lemon fa-fw"></i>
                    Fruits
                </a>
            </li>
        </ul>
    </div>
</div>

<!-- Footer -->
<div class="flex justify-between items-center p-2">
    <a class="btn">
        <img alt="Profile" src="/avatar.png" class="w-8 rounded-full" />

        <div class="flex flex-col text-start">
            <span class="font-bold">User name</span>
            <span class="text-sm text-accent">user@email.com</span>
        </div>
    </a>

    <a class="btn btn-error btn-sm mr-3" title="Logout">
        <i class="fa-solid fa-door-open"></i>
    </a>
</div>
