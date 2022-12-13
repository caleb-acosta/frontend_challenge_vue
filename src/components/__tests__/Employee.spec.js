import { describe, it, expect } from "vitest";
import { shallowMount, mount } from "@vue/test-utils";
import Employee from "../Employee.vue";

describe("Employee Component", () => {
  it("auto-assigns an ID when created", () => {
    const id = 0;
    const wrapper = shallowMount(Employee, {
      global: {
        mocks: {
          $helper: {
            current_id: id,
            profilePic() {
              "";
            },
          },
        },
        stubs: { FontAwesomeIcon: true },
      },
      props: {
        model: { type: "manager" },
      },
    });

    expect(wrapper.props().model.name).toMatch(`manager ${id}`);
    expect(wrapper.props().model.id).toBe(id);
  }),
    it("manager can add children of different types", async () => {
      const wrapper = createWrapper("manager");
      await wrapper.findAll("[icon]")[2].trigger("click");

      expect(wrapper.props().model.allocation).toBe(300);

      // Add dev
      await wrapper.findAll(".add-buttons > button")[0].trigger("click");
      expect(wrapper.props().model.allocation).toBe(1300);

      // Add Manager
      await wrapper.findAll(".add-buttons > button")[1].trigger("click");
      expect(wrapper.props().model.allocation).toBe(1600);

      // Add QA
      await wrapper.findAll(".add-buttons > button")[2].trigger("click");
      expect(wrapper.props().model.allocation).toBe(2100);

      expect(wrapper.props().model.children.length).toBe(3);
    });

  it("manager deletes children", async () => {
    const wrapper = createWrapper("manager");
    await wrapper.findAll("[icon]")[2].trigger("click");

    expect(wrapper.props().model.allocation).toBe(300);

    // Add dev
    await wrapper.findAll(".add-buttons > button")[0].trigger("click");
    expect(wrapper.props().model.children.length).toBe(1);
    expect(wrapper.props().model.allocation).toBe(1300);

    //Delete dev
    await wrapper.findAll(".dev > .employee-info > [icon]")[0].trigger("click");
    expect(wrapper.props().model.children.length).toBe(0);
    expect(wrapper.props().model.allocation).toBe(300);
  }),
    it("shows and hides the manager buttons", async () => {
      const wrapper = createWrapper("manager");

      expect(wrapper.find(".add-buttons").isVisible()).toBe(false);

      await wrapper.findAll("[icon]")[2].trigger("click");
      expect(wrapper.find(".add-buttons").isVisible()).toBe(true);
    }),
    it("emits updates to parent", async () => {
      const wrapper = createWrapper("manager");

      await wrapper.findAll(["[icon]"])[1].trigger("click");

      expect(wrapper.emitted()).toHaveProperty("update-allocation");
      expect(wrapper.emitted()).toHaveProperty("delete-child");
    }),
    it("does not sow option when is not a manager", () => {
      const wrapper_manager = createWrapper("manager");
      const wrapper_dev = createWrapper("developer");
      const wrapper_qa = createWrapper("qa");

      expect(wrapper_manager.find(".add-buttons").exists()).toBe(true);
      expect(wrapper_dev.find(".add-buttons").exists()).toBe(false);
      expect(wrapper_qa.find(".add-buttons").exists()).toBe(false);
    }),
    it("shows and hides the children", async () => {
      const wrapper = createWrapper("manager");

      expect(wrapper.find("ul").isVisible()).toBe(false);

      await wrapper.findAll(".add-buttons > button")[0].trigger("click");
      expect(wrapper.find("ul").isVisible()).toBe(true);

      await wrapper.findAll("[icon]")[0].trigger("click");
      expect(wrapper.find("ul").isVisible()).toBe(false);
    });
});

function createWrapper(emp_type) {
  const manager_model = { type: emp_type };
  return mount(Employee, {
    global: {
      mocks: {
        $helper: {
          current_id: 0,
          profilePic() {
            "";
          },
        },
      },
      stubs: { FontAwesomeIcon: true },
    },
    props: {
      model: manager_model,
    },
  });
}
