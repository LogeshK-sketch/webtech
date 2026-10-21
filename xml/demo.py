
from lxml import etree
from pathlib import Path

folder = Path(__file__).parent
xml_file = folder / "students.xml"

try:
    parser = etree.XMLParser(
        dtd_validation=True,
        resolve_entities=False,
        no_network=True
    )

    tree = etree.parse(str(xml_file), parser)

    print("XML is valid according to the DTD.")
    print("\nFormatted XML:\n")

    formatted_xml = etree.tostring(
        tree,
        pretty_print=True,
        encoding="unicode",
        doctype=tree.docinfo.doctype
    )

    print(formatted_xml)

    output_file = folder / "students_formatted.xml"
    output_file.write_text(
        formatted_xml,
        encoding="utf-8"
    )

    print(f"\nFormatted file saved to: {output_file}")

except (etree.XMLSyntaxError, OSError) as err:
    print("XML validation failed:")
    print(err)
